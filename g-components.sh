#!/usr/bin/env bash
componentName=$1;

nameLen=${#componentName}

firstChar=${componentName:0:1}
other=${componentName:1:$nameLen}

upperfirstChar=$(echo $firstChar | tr "[a-z]" "[A-Z]")
lowerfirstChar=$(echo $firstChar | tr "[A-Z]" "[a-z]")

componentName="$upperfirstChar$other"
componentNameId="$lowerfirstChar$other"

mkdir public/back/components/$componentName

indexJSX="public/back/components/$componentName/index.jsx"
componentJSX="public/back/components/$componentName/$componentName.jsx"
componentSCSS="public/back/components/$componentName/$componentName.scss"

touch $indexJSX
touch $componentJSX
touch $componentSCSS

indexTmp="module.exports = require(\"./$componentName.jsx\");"
componentTmp="require('./$componentName.scss'); \n\r
import React,{Component} from 'react' \n
import ReactDOM from 'react-dom' \n
const T = React.PropTypes; \n\r
var propTypes = { \n
}; \n\r
var defaultProps = { \n
}; \n\r
class $componentName extends Component { \n
    constructor(props){ \n
        super(props); \n
        this.state = {\n\r
        }; \n
    } \n
    render(){ \n
        return ( \n
            <div id=\"$componentNameId\"> \n
            </div> \n
        ) \n
    } \n
} \n

$componentName.propTypes = propTypes; \n\r
$componentName.defaultProps = defaultProps; \n\r

module.exports = $componentName;"

scssTmp="@import \"../../../styles/core/variables.scss\"; \n\r
#$componentNameId{ \n\r

}\n
"

echo $indexTmp > $indexJSX
echo -e $componentTmp > $componentJSX
echo -e $scssTmp > $componentSCSS