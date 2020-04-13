import React, {Component} from 'react'

class PreviewLogo extends Component {
    render() {
        const style = {
            container: {
                text: this.props.logo.text,
                color: this.props.logo.color,
                fontSize: this.props.logo.fontSize + "pt",
                backgroundColor: this.props.logo.backgroundColor,
                borderColor: this.props.logo.borderColor,
                borderRadius: this.props.logo.borderRadius + "pt",
                borderWidth: this.props.logo.borderWidth + 'pt',
                padding: this.props.logo.padding + 'pt',
                margin: this.props.logo.margin + 'pt'
            }
        }
        return (
            <div className="col s8">
                <div 
                style={ style.container }>
                    {style.container.text}
                </div>
            </div>
        )
    }
}

export default PreviewLogo