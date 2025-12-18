Feature: Transfer API (stubbed backend)

Background:
  * url baseUrl
  * path '/api/transfer'
  * configure headers = { 'Content-Type': 'application/json' }

Scenario: Create a transfer and verify transaction details
  * def recipientName = 'test-user'
  * def amount = 50

  Given request
  """
  { "recipientName": "#(recipientName)", "amount": #(amount) }
  """
  When method post
  Then status 201

  # schema check
  And match response == read('transfer-schema.json')

  # business rules
  And match response.message == 'Transfer successful'
  And match response.transaction.description == 'Transfer to ' + recipientName
  And match response.transaction.amount == -amount
  And match response.transaction.status == 'pending'
