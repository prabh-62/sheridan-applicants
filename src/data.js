const inquiry1 = {
  id: 'q3',
  firstName: 'Ryan',
  lastName: 'Gosling',
  email: 'ryan.gosling@sheridancollege.ca',
  program: 'PCSSC',
  request: 'Hey',
  requestDate: '03/03/2016'
}
const inquiry2 = {
  id: 'q4',
  firstName: 'Robert',
  lastName: 'Downey Jr',
  email: 'robert.downey@sheridancollege.ca',
  program: 'PCSSC',
  request: 'Hey',
  requestDate: '03/03/2016'
}

const inquiries = [inquiry1, inquiry2]

const getInquiryById = id =>
  new Promise(resolve => {
    const [user] = inquiries.filter(video => {
      return video.id === id
    })
    resolve(user)
  })

const getInquiries = () => new Promise(resolve => resolve(inquiries))

const createInquiry = ({firstName, lastName, email, program, request, requestDate}) => {
  const inquiry = {
    id: (new Buffer(firstName, 'utf8')).toString('base64'),
    firstName,
    lastName,
    email,
    program,
    request,
    requestDate
  }
  inquiries.push(inquiry)
  return inquiry
}
exports.getInquiryById = getInquiryById
exports.getInquiries = getInquiries
exports.createInquiry = createInquiry
