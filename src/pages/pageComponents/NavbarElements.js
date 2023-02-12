import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
  background: transparent;
  height: 60px;
  display: flex;
  justify-content: space-between;

  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  padding: 0 1rem;
  height: 40%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #000;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  aligh-items: center;
  margin-right: 15px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
