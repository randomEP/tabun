import React from 'react';

import autobind from 'autobind-decorator'


@autobind
export default class FileUpload extends React.PureComponent {
    inputField = null;

    static propTypes = {
        title: React.PropTypes.string,
        titleClass: React.PropTypes.string,
        acceptMime: React.PropTypes.string,
        handleUpload: React.PropTypes.func,
    };

    onLoad(image) {
        this.inputField.value = '';
        this.props.handleChange(image.target.result);
    }

    setRef(inputField) {
        if (inputField) this.inputField = inputField;
    }

    handleUpload({target:{files}}) {
        const file = files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = this.onLoad;
        reader.readAsDataURL(file);
    }

    render() {
        const name = String(Math.random() * 10**20);
        return <div>
            <input
                className="react-fileinput"
                onChange={this.handleUpload}
                ref={this.setRef}
                type="file"
                name={name}
                id={name}
                accept={this.props.acceptMime}
            />
            <label htmlFor={name} className={this.props.titleClass}>{this.props.title}</label>
        </div>
    }
}
