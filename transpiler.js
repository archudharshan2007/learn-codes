// Java-to-JavaScript Transpiler for CodeEasy

export function transpileJava(javaCode) {
  let js = javaCode;

  // Remove package/import lines
  js = js.replace(/package\s+[\w.]+;/g, '');
  js = js.replace(/import\s+[\w.*]+;/g, '');

  // Translate typed array declarations: String[] fruits = {"a","b"} → let fruits = ["a","b"]
  js = js.replace(/\b\w+\[\]\s+(\w+)\s*=\s*\{([^}]+)\}/g, 'let $1 = [$2]');

  // Translate class declarations with basic body
  js = js.replace(/class\s+(\w+)\s*\{([\s\S]*?)\}\s*(?=\n|$)/g, (match, className, body) => {
    let cleanBody = body;
    // Convert method declarations
    cleanBody = cleanBody.replace(/\b(?:public|private|protected)?\s*(?:static)?\s*(?:void|int|String|double|boolean)\s+(\w+)\s*\(([^)]*)\)\s*\{/g, '$1($2) {');
    // Convert field declarations to constructor assignments
    const fields = [];
    cleanBody = cleanBody.replace(/\b(?:String|int|double|boolean|char)\s+(\w+)\s*;/g, (m, name) => { fields.push(name); return ''; });
    const ctor = `constructor() {\n    ${fields.map(f => `this.${f} = null;`).join('\n    ')}\n  }`;
    return `class ${className} {\n  ${ctor}\n  ${cleanBody.trim()}\n}`;
  });

  // Extract main method body and hoist it
  const mainMatch = js.match(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
  if (mainMatch) {
    const mainBody = mainMatch[1];
    // Remove the outer class wrapper
    js = js.replace(/public\s+class\s+\w+\s*\{[\s\S]*public\s+static\s+void\s+main[\s\S]*/, mainBody);
  }

  // Translate static method declarations
  js = js.replace(/public\s+static\s+(?:int|double|String|boolean|void)\s+(\w+)\s*\(([^)]*)\)\s*\{/g, (m, name, params) => {
    const cleanParams = params.replace(/\b(?:int|double|String|boolean|char)\s+/g, '');
    return `function ${name}(${cleanParams}) {`;
  });

  // Translate variable types: int x = 5 → let x = 5
  js = js.replace(/\b(?:int|double|float|char|String|boolean)\s+([a-zA-Z_]\w*)\b(?!\s*\()/g, 'let $1');

  // Translate typed object instantiation: Dog myDog = new Dog() → let myDog = new Dog()
  js = js.replace(/\b[A-Z]\w+\s+(\w+)\s*=\s*new\s+/g, 'let $1 = new ');

  // System.out.println → console.log
  js = js.replace(/System\.out\.println\s*\(/g, 'console.log(');
  js = js.replace(/System\.out\.print\s*\(/g, 'console.log(');

  return js.trim();
}

export function runCode(code, language) {
  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => {
    logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
  };

  try {
    const runnable = language === 'java' ? transpileJava(code) : code;
    // eslint-disable-next-line no-new-func
    new Function(runnable)();
    console.log = originalLog;
    return { output: logs.join('\n') || '(no output)', error: null };
  } catch (err) {
    console.log = originalLog;
    return { output: '', error: err.message };
  }
}
