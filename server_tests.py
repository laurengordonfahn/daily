import server
import unittest

class ServerTestCase(unittest.TestCase):

    def setUp(self):
        """ This supports try/catch test to produce status codes"""
        self.client = server.app.test_client()
        server.app.config['TESTING'] = True

    def test_index(self):
        client = server.app.test_client()

        result = client.get('/')
        self.assertIn('<div id=\'main\'></div>', result.data)

    # def test_signUp(self):
    #     client = server.app.test_client()

    #     result = client.post('/signUp')
    #     self.assertEqual(result.status_code, 200)

if __name__ == '__main__':
    unittest.main()