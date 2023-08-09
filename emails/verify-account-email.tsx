import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface VerfiyAccountEmailProps {
  url: string
}
export const VerfiyAccountEmail: React.FC<VerfiyAccountEmailProps> = ({
  url,
}) => (
  <Html dir="rtl">
    <Head />
    <Preview>You're now ready to make live transactions with Stripe!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src="../public/images/logo.png"
            width="100"
            height="21"
            alt="popweb logo"
          />
          <Hr style={hr} />
          <Text dir="rtl" style={paragraph}>
            این ایمیل جهت فعالسازی حساب کاربری شما در پاپ وب است.
          </Text>
          <Text style={paragraph}>
            این ایمیل را در اختیار هیچ کس قرار ندهید ، پاپ وب هیچ گاه در مورد
            این ایمیل از شما سوال نمی کند.
          </Text>
          <Button pX={10} pY={10} style={button} href={url}>
            فعالسازی حساب کاربری
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default VerfiyAccountEmail

const main = {
  backgroundColor: "#f6f9fc",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const box = {
  padding: "0 48px",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "right" as const,
}

const anchor = {
  color: "#556cd6",
}

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
}
