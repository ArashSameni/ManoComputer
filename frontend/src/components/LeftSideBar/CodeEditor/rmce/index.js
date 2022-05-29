
import React from 'react'
import Prism from 'prismjs'

let selection = document.getSelection()

let escapeHTML = html => html.replace(/</g, '&lt;')

export let CodeEditor = React.forwardRef(function CodeEditor({
	children = '',
	value = children,
	onChange = () => { },
	language,
	highlight = code => language ? Prism.highlight(code, Prism.languages[language]) : escapeHTML(code),
	readOnly = false,
	className = 'rmce',
	...props
}, forwardedRef) {
	let pos = React.useRef(0)

	let ref = React.useRef()

	function innerRef(node) {
		ref.current = node
		if (forwardedRef) typeof forwardedRef == 'function' ? forwardedRef.current = node : forwardedRef(node)
	}

	props.onKeyDown = e => {
		let ch

		if (e.key === 'Tab') ch = '\t'
		if (e.key === 'Enter') ch = '\n'

		if (!ch) return
		e.preventDefault()

		// Insert char
		let range = selection.getRangeAt(0)
		range.deleteContents()
		range.insertNode(new Text(ch))
		range.collapse()

		props.onInput()
	}

	props.onInput = () => {
		let target = ref.current
		let code = target.textContent
		// Get and save cursor position
		if (!selection.anchorNode) return

		let range = new Range();
		range.setStart(target, 0)
		range.setEnd(selection.anchorNode, selection.anchorOffset)

		pos.current = range.toString().length

		onChange(code)
	}

	React.useLayoutEffect(() => {
		// Set cursor position
		let p = pos.current
		let child = ref.current.firstChild

		while (p > 0) {
			if (!child) return
			let length = child.textContent.length
			if (p > length) {
				p -= length
				child = child.nextSibling
			}
			else {
				if (child.nodeType === 3) return selection.collapse(child, p)
				child = child.firstChild
			}
		}
	}, [value])

	return <code
		spellCheck='false'
		contentEditable={!readOnly}
		dangerouslySetInnerHTML={{ __html: highlight(value) + '<br>' }}
		className={className}
		ref={innerRef} {...props}
	/>
})

export default CodeEditor
export function Code(props) {
	return <CodeEditor readOnly {...props} />
}
