// Header.js
import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Header, HeaderContainer, HeaderName, HeaderNavigation, SkipToContent } from '@carbon/react';

export const NpsHeader = () => (
  <HeaderContainer render={({ isSideNavExpanded, onClickSideNavExpand }) => (
    <>
      <Header aria-label="IBM Platform Name">
        <SkipToContent />
        <HeaderName href="/" prefix="IBM">
          Enterprise Data
        </HeaderName>
        <HeaderNavigation aria-label="IBM Enterprise Data">
          <Link to="/" className="header-menu-item">Home</Link>
          <Link to="/setupquiz" className="header-menu-item">Setup Quiz</Link>
          <Link to="/selectsections" className="header-menu-item">Start Quiz</Link>
        </HeaderNavigation>
      </Header>
    </>
  )} />
);
