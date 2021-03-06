import React, {Component} from 'react';
import style from './menu.scss';
import AuthButton from '../containers/auth_button';
import classnames from 'classnames';
import _ from 'lodash';
import Labels from '../containers/labels';

export default class Menu extends Component {
  subHeader() {
    let {username} = this.props;
    if (username) {
      return (
        <div className="sub header">
          with <a href="#">{username}</a>
        </div>
      );
    }

    return null;
  }

  menuOptions() {
    const {menuActions, options} = this.props;
    return (
      <div className="ui secondary inverted vertical small fluid pointing menu">
           {options.map((option, key) => {
             let action = _.property(option.action)(menuActions);
             let props = {
               key,
               onClick: _.isFunction(action) ? action : () => {
                 throw new Error(`There are no such action like: ${option.action}`);
               },
               className: classnames('item', {active: option.active})
             };

             if (_.isFunction(action)) {
               props.onClick = action;
             }

             let icon = option.icon ? <i className={classnames(option.icon, 'icon')}/> : null;

             return (
               <a {...props}>{icon}{option.label}</a>
             );
           })}
      </div>
    );
  }

  render() {
    const {fetch = () => null, username = null, inProgress: loading} = this.props;
    return (
      <div className={style.container}>
        <div className={style.topSection}>
          <h2 className="ui center aligned inverted icon header">
            <i className={classnames('github square link icon', {loading})}
               onClick={() => username ? fetch() : null}/>
            GistLab
              {this.subHeader()}
          </h2>
          <div className={style.userSection}>
            <AuthButton/>
          </div>
             {this.menuOptions()}
        </div>
        <div className={style.bottomSection}>
          {username ? <Labels /> : null}
        </div>
      </div>
    );
  }
}

export default Menu;
