import { FooterContainer, FooterTitle, FooterColumn, FooterItem, FooterWrapper,FooterBottom } from "./Footer.styles";

export default function Footer() {
    return (
        <FooterContainer>
            <FooterWrapper>
                <FooterTitle>ReactTool</FooterTitle>
                <FooterColumn>
                    <FooterItem>Sobre o Projeto</FooterItem>
                     <FooterItem>Carreiras</FooterItem>
                    <FooterItem>Documentação</FooterItem>
                </FooterColumn>

                <FooterColumn>
                    <FooterItem>Blogs adicionais</FooterItem>
                    <FooterItem>Novidades</FooterItem>
                    <FooterItem>Canais importantes</FooterItem>
                </FooterColumn>

                <FooterColumn>
                    <FooterItem>Suporte</FooterItem>
                    <FooterItem>Política de Privacidade</FooterItem>
                    <FooterItem>Termos de Uso</FooterItem>
                </FooterColumn>
            </FooterWrapper>
            <FooterBottom>
                <p>ReactTool © 2022</p>
            </FooterBottom>
        </FooterContainer>
    );
}
