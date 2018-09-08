import React, { Component } from 'react';
import Prism from 'prismjs'
import CodeEditor from 'commonComponents/CodeEditor'

import './style.css'
// props:
// - code
class Code extends Component {

	render() {
		// return (
		// 	<div className="view-code">
		// 		<pre>
		// 			<code className={"language-" + this.props.language} dangerouslySetInnerHTML={{__html: Prism.highlight(this.props.code, Prism.languages.javascript)}}>

		// 			</code>
		// 		</pre>
		// 	</div>
		// );

		return (
			<CodeEditor value={this.props.code} mode={this.props.language} readOnly={true} />
		)
	}
}

export default Code;
