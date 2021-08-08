import styled from 'styled-components';

export const Divider = styled.div`
  height: 1px;
  overflow: hidden;
  background: #e9ecef;
`;
export const Header = styled.span`
  transition: transform 0.2s, height 300ms, color 300ms, background-color 300ms;
  display: block;
  line-height: 2.5rem;
  height: 2.5rem;
  padding: 0 1.5rem;
  position: relative;
  border-radius: 0.25rem;
  color: #343a40;
  white-space: nowrap;
  font-weight: 600;
  font-size: 1rem;
`;

export const Content = styled.div`
  margin-top: 1rem;
`;
