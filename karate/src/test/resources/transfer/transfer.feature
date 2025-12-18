Feature: Transfer API (stubbed backend)

Background:
  * url baseUrl
  * path '/api/transfer'
  * configure headers = { 'Content-Type': 'application/json' }

Scenario: Create a transfer and verify transaction details
  * def recipientName = 'qe'
  * def amount = 231

  Given request
  """
  { "recipientName": "#(recipientName)", "amount": #(amount) }
  """
  When method post
  Then status 201

  # schema check
  And match response ==
  """
  {
    message: 'Transfer successful',
    transaction: {
      id: '#string',
      date: '#regex \\d{4}-\\d{2}-\\d{2}',
      description: '#string',
      amount: '#number',
      status: '#string'
    }
  }
  """

  # business rules (matches Mirage behavior you observed)
  And match response.transaction.description == 'Transfer to ' + recipientName
  And match response.transaction.amount == -amount
  And match response.transaction.status == 'pending'
