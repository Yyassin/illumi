import React from 'react';
import { Modal, Form, Input, Button, Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Form.css'

class UploadImage extends React.Component {

    state = {
        imageUrl: undefined,
        imageAlt: undefined,
        fileList: [],
        uploading: false,
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
            formData.append('upload_preset', 'qvfwjbwg');
            formData.append('upload_preset', 'darwin');
        });
    
        this.setState({
            uploading: true,
        });
        

        const options = {
          method: 'POST',
          body: formData,
          success: () => {
            this.setState({
              fileList: [],
              uploading: false,
            });
            message.success('upload successfully.');
          },
          error: () => {
            this.setState({
              uploading: false,
            });
            message.error('upload failed.');
          },
        };

        return fetch('https://api.cloudinary.com/v1_1/dppx2a9sm/', options)
        .then(res => res.json())
        .then(res => {
            this.setState({
                imageUrl: res.secure_url,
                imageAlt: `An image of ${res.original_filename}`,
                fileList: [],
                uploading: false,
                }, () => {
                    console.log(this.state.initFields)
                });
                
                this.props.page ? (
                    this.props.form.current.setFieldsValue({
                        image: res.secure_url
                    })
                ) :
                (
                    this.props.form.current.setFieldsValue({
                        thumbnail: res.secure_url
                    })
                )
                message.success('upload successfully.');
                
        })
        .catch(err => {
            console.log(err)
            this.setState({
                uploading: false,
              });
              message.error('upload failed.');
        });
    }

    render() {
        const { uploading, fileList } = this.state;
        const props = {
        onRemove: (file) => {
            this.setState((state) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
            });
        },
        beforeUpload: (file) => {
            let imageType;
            console.log(file.name.split('.')[1])
            console.log((file.name.split('.')[1] in ['jpg']))
            if (['jpg', 'png'].indexOf(file.name.split('.')[1]) === -1) {
                imageType = false;
            } else {
                imageType = true;
            }

            if (imageType) {
                this.setState(state => ({
                fileList: [...state.fileList, file],
                }));
                return false;
            } else {
                return message.error('Please upload an image file (.jpg or .png).');
            }

        },
        fileList,
        };

        return (
            <div className="upload">
                <Form.Item
                    name="thumbnail-upload"
                    extra="Upload a thumbnail."
                >
                    <Upload {...props}>
                        <Button>
                            <UploadOutlined /> Select File
                        </Button>
                        </Upload>
                        <Button
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                        >
                            {uploading ? 'Uploading' : 'Start Upload' }
                        </Button>
                </Form.Item>

                {this.state.imageUrl && (
                    <img src={this.state.imageUrl} style={{'width': '100px', 'height': '100px'}}alt={this.state.imageAlt} className="displayed-image"/>
                )}
            </div>
        )
    }
}

export default UploadImage;