import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import PreviewLogo from './PreviewLogo';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor() {
        super();

        this.state = { 
        text: "logo",
        color: '#000000',
        fontSize: '20',
        backgroundColor: '#FFFFFF',
        borderColor: '#654321',
        borderRadius: '1',
        borderWidth: '1',
        padding: '1',
        margin: '1'};

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
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container"> 
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                            </h3>
                                        </div>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                        <div className="panel-body row col s8">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
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
                                                    }} placeholder="Text" defaultValue={data.logo.text}
                                                    onChange={this.handleTextChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color}
                                                    onChange={this.handleTextColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize}
                                                    onChange={e => {
                                                        data.logo.fontSize=e.target.value;
                                                    }} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                        }} defaultValue={data.logo.backgroundColor}
                                                        onChange={this.handleBackgroundColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                        }} defaultValue={data.logo.borderColor}
                                                        onChange={this.handleBorderColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} defaultValue={data.logo.borderRadius}
                                                    onChange={this.handleBorderRadiusChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} defaultValue={data.logo.borderWidth}
                                                    onChange={this.handleBorderWidthChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} defaultValue={data.logo.padding}
                                                    onChange={this.handlePaddingChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" min='1' max='60'className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} defaultValue={data.logo.margin}
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;