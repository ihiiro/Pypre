#!/usr/bin/env node

/*

  # this binary module generates pypre.py script in current working directory #

  # requires python3 to be installed globally #

  # author: $preconfigure_author$ #
  # email: $preconfigure_email$ #
  # version: $preconfigure_version$ #
  # version-date: $preconfigure_versionDate$ #
  # creation date: $preconfigure_creationDate$ #

 */

import { writeFileSync, readFileSync } from 'fs';
import { extname } from 'path';

// get filename and vars from .pypre.json
var pypre_json = JSON.parse(readFileSync('./.pypre.json', 'utf8'));

// build python if statements into a properly indented string
let logic_branches_string = '';
for (let key in pypre_json.vars) {
  logic_branches_string = logic_branches_string + `    if x.group() == '$preconfigure_${key}$':
      return '${pypre_json.vars[key]}'\n`;
};

// edit together all variables and literal strings into properly indented python code
const python_code = `# this script preconfigures to ${pypre_json.filename}

import re
import os

# preconfigure file name
preconfigure_file = os.path.abspath(os.path.dirname(__file__)) + '/${pypre_json.filename.split('.')[0]}.preconfig${extname(pypre_json.filename)}'

# open then close automatically
with open(preconfigure_file, 'r') as file:
    non_valid_js_code = file.read()


def preconfigure(x):
${logic_branches_string}
# replaces each matching string with conditional static value
valid_js_code = re.sub('\\$preconfigure_[a-zA-Z]+\\$', lambda x: preconfigure(x), non_valid_js_code);

# produce ${pypre_json.filename}
with open('./' + '${pypre_json.filename}', 'w') as file:
    file.write(valid_js_code)
    `
// produce pypre.py file
writeFileSync(`./pypre.py`, python_code, err => {
  if (err) throw err;
});
