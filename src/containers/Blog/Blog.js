import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import InputFileComponent from '../../components/Input/InputFileComponent';
import AppButton from '../../components/AppButton/AppButton';

const Blog = ({ handleCloseDialog }) => {
  const { blog, getBlogByIdAllLanguages, addBlog, updateBlog, error, success } =
    useContext(AdminServiceContext);

  const initialState = {
    id: null,
    mainImage: null,
    images: [],
    blogContents: [
      { languageId: 1, title: '', content: '', languageName: 'ქართული' },
      { languageId: 2, title: '', content: '' },
      { languageId: 3, title: '', content: '' },
    ],
  };

  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState(null);

  const lang = i18n.language || 'en';
  const { blogId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getBlogByIdAllLanguages(blogId);
      setLoading(false);
    };
    if (blogId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (blog) {
      if (blogId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: blogId,
          blogContents: blog.blogContents,
        }));
        setMainImageUrl(blog.mainImageUrl);
        setImageUrls(blog.imageUrls);
      } else {
        setFormData(initialState);
      }
    }
  }, [blog]);

  const handleBlogContentChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedBlogContents = [...prevFormData.blogContents];
      updatedBlogContents[index][field] = value;

      return { ...prevFormData, blogContents: updatedBlogContents };
    });
  };

  const handleMainImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mainImage: e,
    }));
  };

  const handleImagesChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...e],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    setLoading(true);
    if (blogId) {
      await updateBlog(formData);
    } else {
      await addBlog(formData);
    }
    setLoading(false);
    if (success) {
      handleCloseDialog();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <h2>blogId: {blogId}</h2>
      <form onSubmit={handleSubmit}>
        {formData.blogContents.map((blogContent, index) => (
          <div key={blogContent.languageId}>
            <h2>Language: {blogContent.languageId}</h2>
            <InputComponent
              label="title"
              type="text"
              id={`title_${blogContent.languageId}`}
              name="title"
              required={true}
              value={blogContent.title}
              onChange={(e) => handleBlogContentChange(index, 'title', e.target.value)}
            />
            <InputComponent
              label="content"
              type="text"
              id={`content_${blogContent.languageId}`}
              name="content"
              required={true}
              value={blogContent.content}
              onChange={(e) => handleBlogContentChange(index, 'content', e.target.value)}
            />
          </div>
        ))}
        <InputFileComponent
          label="Main Image"
          type="file"
          id="MainImage"
          name="MainImage"
          multiple={false}
          required={!blogId}
          onFileSelected={handleMainImageChange}
        />
        <InputFileComponent
          label="images"
          type="file"
          id="images"
          name="images"
          multiple={true}
          required={!blogId}
          onFileSelected={handleImagesChange}
        />
        {error && <label>{error}</label>}
        <div className="form-group row"></div>
        <div className="form-group row"></div>
        <div className="form-group row">
          <AppButton type={'submit'} full label="submit" />
        </div>
      </form>
    </>
  );
};

export default Blog;
