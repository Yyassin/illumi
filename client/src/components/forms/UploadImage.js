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
        console.log(fileList)
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', fileList[0]);
            formData.append('upload_preset', 'qvfwjbwg');
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

        // change to https://api.cloudinary.com/v1_1/dppx2a9sm/image/upload at deploy
        return fetch('https://api.cloudinary.com/v1_1/nedy123/image/upload', options)
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
            this.setState(state => ({
            fileList: [...state.fileList, file],
            }));
            return false;
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