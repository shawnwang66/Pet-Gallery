import React, { Component } from 'react';
import "./NavBar.style.scss";
import { Input } from 'semantic-ui-react'
import dog from '../../assets/dog.png';
import cat from '../../assets/cat.png';
import * as Scroll from 'react-scroll';
import {animateScroll as scroll } from 'react-scroll'


export default class NavBar extends Component{
    constructor(props){
        super(props);
        this.state={
            expanded:this.props.expanded,
            scroll:0
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
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

    focusHandler(){
        scroll.scrollTo(550);
    }

    render() {
        const position = this.state.scroll;
        const top = 500+position/11;
        const topStr = (position<=550)?(top+'px'):'550px';
        const opacity = (500-position)/500;
        const navOpacity = (400-position>=0)?0:(position-400)/100;
        console.log(navOpacity);

        const search = (<Input
            className='search'
            style={{top:topStr}}
            fluid={true}
            icon='search'
            placeholder='Search...'
            onFocus={this.focusHandler}
        />);
        if (this.state.expanded){
            return (
                <div className={position<=540?'nav-expanded':'nav-minimized'}>
                    <div className='nav-item-left' style={{opacity:navOpacity}}>Pet Gallery</div>
                    <div className='title' style={{opacity:opacity}}>
                        <img className='icon-cat' src={cat}/>
                        Pet Gallery
                        <img className='icon-dog' src={dog}/>
                    </div>
                    <div className='nav-item-right' style={{opacity:navOpacity}}>Log in</div>
                    {search}

                </div>
            )
        }
        else{
            return (
                <div className={'nav-minimized'}>
                    <div className='nav-item-left' style={{opacity:1}}>Pet Gallery</div>
                    <Input
                        className='search'
                        style={{top:'550px'}}
                        fluid={true}
                        icon='search'
                        placeholder='Search...'
                    />
                    <div className='nav-item-right' style={{opacity:1}}>Log in</div>
                </div>
            )
        }

    }
}
