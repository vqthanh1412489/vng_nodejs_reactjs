import Link from "next/link";
import { Component } from "react";
import './Header.scss';
import { Input, Badge, Icon, Avatar, Popover } from "antd";

const Search = Input.Search;

class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="header-content">
                    <div className="container">
                        <div className="logo-wrapper">
                            <img className="logo" src={require('../../public/icons/cpn-logo.png')}/>
                        </div>
                        <div className="search-wrapper">
                            <Search
                                className="search-content"
                                placeholder="Tìm kiếm"
                                enterButton="Tìm"
                                size="large"
                                onSearch={value => console.log(value)}
                            />
                        </div>
                        <div className="shop-cart-wrapper">
                        <Popover placement="bottom" title={'de'} content={'k'} trigger="click">
                            <Badge count={5} title="Custom hover text">
                                <Icon type="shopping-cart" />
                            </Badge>
                            </Popover>
                        </div>
                        <div className="my-user-wrapper">
                            <Avatar icon="user" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Header;
