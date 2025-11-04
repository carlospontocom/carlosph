import styled from "styled-components";

export const FooterContainer = styled.section`
  background-color: black;
  color: #fff;
  padding: 5rem 0 0 0;
 `;


export const FooterWrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 2fr ;
    padding: 1rem;
    margin:0 auto;
    max-width: 1140px;
`;

export const FooterTitle = styled.h4`
  color: orange;
  font-weight: 300;
  font-size: 28px;
  grid-column:1/-1;
`;

export const FooterColumn = styled.ul`  
`;

export const FooterItem = styled.li`
  padding: 5px;
`;

export const FooterBottom = styled.div`
border-top: 1px solid gray;
padding: 40px 0;
`;
