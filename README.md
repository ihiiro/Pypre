# pypre v3.0.0

pypre is an npm binary package for preconfiguring files.

## install
```
npm install -g pypre
 ```

## usage
create package.json file in the directory where you have files to preconfigure:
```
npm init -y
```

go to the root of your project and run :
```
npm link
```

then back to the child directory, run:
```
npm link [name-of-your-parent-project]
```

navigate to the directory where you have files you want to preconfigure and create a single .pypre.json file containing the keys:
```json
{
  "filename": "yourfilename",
  "vars": {
    "var1": "value1",
    "var2": "value2",
    ...
  }
}
```

add a [yourfilename].preconfig.[some-extension] file, with the following placeholders whereever you need them
```
$preconfigure_[here include the name of your placeholder, without the brackets and only letters]$
```

in the child package.json add:
```json
"scripts": {
  "pypre": "pypre && python3 pypre.py && rm pypre.py"
}
```

run pypre where [yourfilename].preconfig.[some-extension] is
```
npm run pypre
```

this should generate a configured file with the name specified in your .pypre.json and placeholders filled in
