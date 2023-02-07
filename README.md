# pypre v1.0.0

pypre is an npm binary package for preconfiguring files prior to runtime.

## install
```
npm install -g pypre
 ```


## syntax
in any place in your file, if you want a placeholder for a future value write $preconfigure_varname where varname is your variable name
```
$preconfigure_varname$
```

## usage
run pypre in the directory where your file with pypre placeholders exists
```
pypre
```

pypre prompts you for a filename(file with pypre placeholders) and a json value with key value pairs where your keys are varnames and values are what to replace those varnames with. For example:

file.js:
```javascript
let password = '$preconfigure_password$';
```

in command line:
```
filename: file.js
json: {"password": "somepssword"}
```

note: if you leave the prompts blank, pypre uses a pypre.json file in the current directory instead. Format it as follows:

pypre.json:
```json
{
  "filename": "file.js",
  "vars": {
    "password": "somepssword"
  }
}
```

a pypre.py file is generated, running it will preconfigure the file and return a file with the same name and placeholders filled in with actual values. I recommand instead of running python directly, add a script to package.json.
