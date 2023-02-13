#!/bin/sh

# https://github.com/kunokdev/cra-runtime-environment-variables

outputFile=env-config.js

# Recreate config file
rm -rf ./$outputFile
touch ./$outputFile

# Add assignment
echo "window.env = {" >> ./$outputFile

# Read each line in printenv file
# Each line represents key=value pairs
printenv | while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varkey=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Only REACT_APP_ variables
  if [[ $(expr match "$varkey" "REACT_APP_.*") == 0 ]]; then
    continue
  fi

  eval evalvarkey="\$$varkey"
  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${evalvarkey}")
  # Otherwise use value from printenv file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varkey: \"$value\"," >> ./$outputFile
done

echo "}" >> ./$outputFile
