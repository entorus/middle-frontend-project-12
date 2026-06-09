import { Card, Form, Button, Row, Col } from 'react-bootstrap'

function RegisterPage() {
  return (
    <Row className='justify-content-center align-content-center'>
      <Col md={8} xxl={6}>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control type="text" placeholder="Имя пользователя" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label htmlFor="inputPassword5">Пароль</Form.Label>
                <Form.Control
                  type="password"
                  id="inputPassword5"
                  placeholder='Пароль'
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label htmlFor="inputPassword5">Подтвердите пароль</Form.Label>
                <Form.Control
                  type="password"
                  id="inputPassword5"
                  placeholder='Подтвердите пароль'
                />
              </Form.Group>
              <Button>Зарегистрироваться</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default RegisterPage