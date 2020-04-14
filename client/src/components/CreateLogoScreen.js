import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import PreviewLogo from './PreviewLogo';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;
class CreateLogoScreen extends Component {
    constructor() {
        super();

        this.state = {
            text: 'logo',
            color: '#000000',
            fontSize: '20',
            backgroundColor: '#FFFFFF',
            borderColor: '#654321',
            borderRadius: '1',
            borderWidth: '1',
            padding: '1',
            margin: '1'
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextColorChange = this.handleTextColorChange.bind(this);
        this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
        this.handleBackgroundColorChange = this.handleBackgroundColorChange.bind(this);
        this.handleBorderColorChange = this.handleBorderColorChange.bind(this);
        this.handleBorderRadiusChange = this.handleBorderRadiusChange.bind(this);
        this.handleBorderWidthChange = this.handleBorderWidthChange.bind(this);
        this.handlePaddingChange = this.handlePaddingChange.bind(this);
        this.handleMarginChange = this.handleMarginChange.bind(this);
    }
    
    handleTextChange = (event) => {
        this.setState({ text: event.target.value});
    }

    handleTextColorChange = (event) => {
        this.setState({ color: event.target.value});
    }

    handleFontSizeChange = (event) => {
        this.setState({ fontSize: event.target.value});
    }

    handleBackgroundColorChange = (event) => {
        this.setState({ backgroundColor: event.target.value});
    }

    handleBorderColorChange = (event) => {
        this.setState({borderColor: event.target.value});
    }

    handleBorderRadiusChange = (event) => {
        this.setState({borderRadius: event.target.value});
    }

    handleBorderWidthChange = (event) => {
        this.setState({borderWidth: event.target.value});
    }

    handlePaddingChange = (event) => {
        this.setState({padding: event.target.value});
    }

    handleMarginChange = (event) => {
        this.setState({margin: event.target.value});
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                            <div className="row col s8">
                                <form className="col s4"
                                    onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                            borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor = "";
                                    borderColor = "";
                                    borderRadius = "";
                                    borderWidth = "";
                                    padding = "";
                                    margin = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} 
                                        value={this.state.text}
                                        onChange={this.handleTextChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }}onChange={this.handleTextColorChange}
                                         values={this.state.color} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" min='1' className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} value={this.state.fontSize}
                                        onChange={this.handleFontSizeChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} value={this.state.backgroundColor}
                                        onChange={this.handleBackgroundColorChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} value={this.state.borderColor}
                                        onChange={this.handleBorderColorChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} value={this.state.borderRadius}
                                        onChange={this.handleBorderRadiusChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} value={this.state.borderWidth}
                                        onChange={this.handleBorderWidthChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} value={this.state.padding}
                                        onChange={this.handlePaddingChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" min='1' max='60'className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} value={this.state.margin}
                                        onChange={this.handleMarginChange} />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                <PreviewLogo
                                    logo={this.state} />
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;