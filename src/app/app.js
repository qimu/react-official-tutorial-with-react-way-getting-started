import React from 'react/addons';
import CommentBox from './components/CommentBox';

/*
 * @class App
 */
class App {

	render(domElement) {
		var reactElement = <CommentBox />;

		// render to DOM
		if (domElement) {
			React.render(reactElement, domElement);
			return;
		}
	}

	renderToDOM(element) {
		if (!element) {
			return debug(new Error('App.renderToDOM: element is required'));
		}

		this.render(element);
	}

}

export default App;
