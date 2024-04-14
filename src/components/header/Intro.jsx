import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Intro() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <p>Welcome to <u>Reciepe Store</u>, your ultimate destination for culinary 
            inspiration and delicious recipes!</p>
            <p>Join our vibrant community of food enthusiasts, share your culinary creations, 
              and connect with fellow foodies who share your passion for cooking. Whether you're hosting a dinner party, planning a family meal, or simply craving something new and delicious, let <u>Reciepe Store</u> be your trusted companion on your culinary adventures.</p>
            <p>Get ready to unleash your inner chef, explore new flavors, and create 
              unforgettable culinary experiences right in your own kitchen. Let's cook, 
              share, and savor the magic of food together! Welcome to <u>Reciepe Store</u>, 
              where every meal is a masterpiece waiting to be discovered.</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}