
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import {useParams, useNavigate } from "react-router-dom";
// import './Carousel.css'; // Make sure to create this CSS file for additional styling

// function Carousel() {
// const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();
//   const [carouselData, setCarouselData] = useState([]);



//   const handleImageChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     setFile(droppedFile);
//   };

//   // data view
//   useEffect(() => {
//     axios.get('http://localhost:3001/api/carousel')
//         .then(result => setCarouselData(result.data))
//         .catch(err => console.log(err));
//   }, []); 


// // add data
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('carousel_img_1', file);
//     formData.append('carousel_des_1', description);

//     axios.post("http://localhost:3001/api/carousel", formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//     .then(result => {
//       console.log(result);
//       alert('Data submitted successfully!');
      
//       // Clear form fields after successful submission
//       setDescription('');
//       setFile(null);

//       // Fetch the updated carousel data
//       fetchCarouselData();

//       // Navigate to '/carousel'
//       navigate('/carousel');
//     })
//     .catch(err => {
//       console.error('Error submitting form:', err);
//       alert('There was an error submitting the form!');
//     });
//   };

//   const fetchCarouselData = () => {
//     axios.get('http://localhost:3001/api/carousel')
//         .then(result => setCarouselData(result.data))
//         .catch(err => console.log(err));
//   };

//   // delete
  
//   const handleDelete = (id) => {
//     axios.delete('http://localhost:3001/api/deleteUser/' + id)
//         .then(res => {
//             console.log(res);
//             window.location.reload();
//         })
//         .catch(err => console.log(err));
// };



//   return (
//     <div className='container'>
//       <div className='d-flex justify-content-center align-items-center'>
//         <div className='p-4 border rounded' style={{ width: '100%', maxWidth: '600px' }}>
//           <h2 className='text-center mb-4'>Carousel Section</h2>
//           <form onSubmit={handleSubmit}>
//             <div className='mb-3'>
//               <label className='form-label'>Carousel Image</label>
//               <div 
//                 className='drag-drop-box'
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={handleDrop}
//               >
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className='form-control'
//                   required
//                   style={{ display: 'none' }} // Hide the default file input
//                   id="fileUpload"
//                 />
//                 <label htmlFor="fileUpload" className="d-block text-center">
//                   {file ? file.name : "Drag & drop an image here or click to select"}
//                 </label>
//               </div>
//             </div>
//             <div className='mb-3'>
//               <label htmlFor="carouselDescription" className='form-label'>Carousel Description</label>
//               <input
//                 type="text"
//                 id="carouselDescription"
//                 placeholder='Enter description'
//                 className='form-control'
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//             </div>
//             <div className='d-flex justify-content-center'>
//               <button type='submit' className='btn btn-primary'>Add</button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <div className='mt-5 d-flex justify-content-center'>
//         <div className="table-responsive" style={{ maxWidth: '1000px' }}>
//           <h3 className='text-center'>Carousel Data</h3>
//           <table className='table table-striped'>
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Description</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {carouselData.map((item, index) => (
//                 <tr key={index}>
//                   <td><img src={`http://localhost:3001/images/${item.carousel_img_1}`} alt="carousel" width="100" /></td>
//                   <td>{item.carousel_des_1}</td>
//                   <td>
//                     <button className='btn btn-success me-2'>Update</button>
//                     <button className='btn btn-danger' onClick={() => handleDelete(item._id)} >Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Carousel;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Carousel.css'; // Make sure to create this CSS file for additional styling

function Carousel() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const navigate = useNavigate();
  const [carouselData, setCarouselData] = useState([]);
  const [currentItemId, setCurrentItemId] = useState(null);

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

  // Data view
  useEffect(() => {
    fetchCarouselData();
  }, []);

  const fetchCarouselData = () => {
    axios.get('http://localhost:3001/api/carousel')
        .then(result => setCarouselData(result.data))
        .catch(err => console.log(err));
  };

  // Add or update data
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('carousel_img_1', file);
    formData.append('carousel_des_1', description);

    if (currentItemId) {
      // Update existing item
      axios.put(`http://localhost:3001/api/carousel/${currentItemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(result => {
        console.log(result);
        alert('Data updated successfully!');
        setDescription('');
        setFile(null);
        setImagePreviewUrl(null);
        setCurrentItemId(null);
        fetchCarouselData();
        navigate('/carousel');
      })
      .catch(err => {
        console.error('Error updating form:', err);
        alert('There was an error updating the form!');
      });
    } else {
      // Add new item
      axios.post("http://localhost:3001/api/carousel", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(result => {
        console.log(result);
        alert('Data submitted successfully!');
        setDescription('');
        setFile(null);
        setImagePreviewUrl(null);
        fetchCarouselData();
        navigate('/carousel');
      })
      .catch(err => {
        console.error('Error submitting form:', err);
        alert('There was an error submitting the form!');
      });
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/deleteUser/${id}`)
        .then(res => {
            console.log(res);
            fetchCarouselData();
        })
        .catch(err => console.log(err));
  };

  // Handle update
  const handleUpdate = (item) => {
    setDescription(item.carousel_des_1);
    setFile(null); // Assume you want to upload a new image
    setImagePreviewUrl(`http://localhost:3001/images/${item.carousel_img_1}`);
    setCurrentItemId(item._id);
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='p-4 border rounded' style={{ width: '100%', maxWidth: '600px' }}>
          <h2 className='text-center mb-4'>Carousel Section</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Carousel Image</label>
              <div 
                className='drag-drop-box'
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleImageChange}
                  className='form-control'
                  style={{ display: 'none' }} // Hide the default file input
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
              <label htmlFor="carouselDescription" className='form-label'>Carousel Description</label>
              <input
                type="text"
                id="carouselDescription"
                placeholder='Enter description'
                className='form-control'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
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
          <h3 className='text-center'>Carousel Data</h3>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carouselData.map((item, index) => (
                <tr key={index}>
                  <td><img src={`http://localhost:3001/images/${item.carousel_img_1}`} alt="carousel" width="100" /></td>
                  <td>{item.carousel_des_1}</td>
                  <td>
                    <button className='btn btn-success me-2' onClick={() => handleUpdate(item)}>Update</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Carousel;


