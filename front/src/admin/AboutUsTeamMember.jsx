import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import './Carousel.css'; 
import AdminPanel from './adminpanel';

function AboutUsTeamMember() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [sociallist1, setSocialList1] = useState('');
  const [sociallist2, setSocialList2] = useState('');
  const [sociallist3, setSocialList3] = useState('');
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setImagePreviewUrl(URL.createObjectURL(droppedFile));
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = () => {
    axios.get('http://localhost:3001/aboutus_teammember/view')
        .then(result => setTeamMembers(result.data))
        .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('imageUrl', file);
    formData.append('sociallist1', sociallist1);
    formData.append('sociallist2', sociallist2);
    formData.append('sociallist3', sociallist3);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    if (currentItemId) {
      axios.put(`http://localhost:3001/aboutus_teammember/updateUser/${currentItemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(result => {
        console.log(result);
        alert('Data updated successfully!');
        setName('');
        setPosition('');
        setFile(null);
        setImagePreviewUrl(null);
        setSocialList1('');
        setSocialList2('');
        setSocialList3('');
        setCurrentItemId(null);
        fetchTeamMembers();
        navigate('/AboutUsTeamMember');
      })
      .catch(err => {
        console.error('Error updating form:', err);
        alert('There was an error updating the form!');
      });
    } else {
      axios.post("http://localhost:3001/aboutus_teammember/create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(result => {
        console.log(result);
        alert('Data submitted successfully!');
        setName('');
        setPosition('');
        setFile(null);
        setImagePreviewUrl(null);
        setSocialList1('');
        setSocialList2('');
        setSocialList3('');
        fetchTeamMembers();
        navigate('/AboutUsTeamMember');
      })
      .catch(err => {
        console.error('Error submitting form:', err);
        alert('There was an error submitting the form!');
      });
    }
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteItemId(id);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      axios.delete(`http://localhost:3001/aboutus_teammember/deleteUser/${deleteItemId}`)
        .then(response => {
          console.log(response.data);
          setShowModal(false);
          setDeleteItemId(null);
          fetchTeamMembers();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleUpdate = (item) => {
    setName(item.name);
    setPosition(item.position);
    setFile(null);
    setImagePreviewUrl(`http://localhost:3001/images/${item.imageUrl}`);
    setSocialList1(item.socialMedia.sociallist1);
    setSocialList2(item.socialMedia.sociallist2);
    setSocialList3(item.socialMedia.sociallist3);
    setCurrentItemId(item._id);
  };

  return (
    <AdminPanel>
      <div className='container mt-5'>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='p-4 border rounded' style={{ width: '100%', maxWidth: '600px' }}>
            <h2 className='text-center mb-4'>About Us Team Member</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input
                  type="text"
                  placeholder='Enter name'
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Position</label>
                <input
                  type="text"
                  placeholder='Enter position'
                  className='form-control'
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Profile Image</label>
                <div 
                  className='drag-drop-box'
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className='form-control'
                    style={{ display: 'none' }}
                    id="fileUpload"
                  />
                  <label htmlFor="fileUpload" className="d-block text-center">
                    {file ? file.name : "Drag & drop an image here or click to select"}
                  </label>
                </div>
                {imagePreviewUrl && (
                  <div className="mt-2 text-center">
                    <img src={imagePreviewUrl} alt="Preview" width="100" />
                  </div>
                )}
              </div>
              <div className='mb-3'>
                <label className='form-label'>Social Media 1</label>
                <input
                  type="text"
                  placeholder='Enter social media link 1'
                  className='form-control'
                  value={sociallist1}
                  onChange={(e) => setSocialList1(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Social Media 2</label>
                <input
                  type="text"
                  placeholder='Enter social media link 2'
                  className='form-control'
                  value={sociallist2}
                  onChange={(e) => setSocialList2(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Social Media 3</label>
                <input
                  type="text"
                  placeholder='Enter social media link 3'
                  className='form-control'
                  value={sociallist3}
                  onChange={(e) => setSocialList3(e.target.value)}
                />
              </div>
              <div className='d-flex justify-content-center'>
                <button type='submit' className='btn btn-primary'>{currentItemId ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>

        <div className='mt-5 d-flex justify-content-center'>
          <div className="table-responsive" style={{ maxWidth: '1000px' }}>
            <h3 className='text-center'>Team Members</h3>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Social Media</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((item, index) => (
                  <tr key={index}>
                    <td><img src={`http://localhost:3001/images/${item.imageUrl}`} alt='profile' width='100' /></td>
                    <td>{item.name}</td>
                    <td>{item.position}</td>
                    <td>
                      <div>{item.socialMedia.sociallist1}</div>
                      <div>{item.socialMedia.sociallist2}</div>
                      <div>{item.socialMedia.sociallist3}</div>
                    </td>
                    <td>
                      <button className='btn btn-primary me-2' onClick={() => handleUpdate(item)}>Update</button>
                      <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminPanel>
  );
}

export default AboutUsTeamMember;
