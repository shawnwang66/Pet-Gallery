import React, { Component } from 'react';
import "./NavBar.style.scss";
import { Input } from 'semantic-ui-react'

export default class NavBar extends Component{
    constructor(props){
        super(props);
        this.state={
            expanded:this.props.expanded,
            scroll:0
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        let position = window.pageYOffset;
        this.setState({scroll:position});

    }

    render() {
        const position = this.state.scroll;
        console.log(position);
        const top = 500+position/11;
        const topStr = (position<=550)?(top+'px'):'550px';
        const opacity = (500-position)/500;



        const search = (<Input
            className='search'
            style={{top:topStr}}
            fluid={true}
            icon='search'
            placeholder='Search...'
        />);
        if (this.state.expanded){
            return (
                <div className={position<=540?'nav-expanded':'nav-minimized'}>
                    <div className='title' style={{opacity:opacity}}>
                        Pet Gallery
                    </div>
                    {search}

                </div>
            )
        }
        else{
            return (
                <div className={'nav-minimized'}>
                    <Input
                        className='search'
                        style={{top:'550px'}}
                        fluid={true}
                        icon='search'
                        placeholder='Search...'
                    />
                </div>
            )
        }

    }
}
