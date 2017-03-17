import React, { PropTypes } from 'react'
import { Upload, Icon, Modal } from 'antd';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { single, size = 100 } = this.props

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="clearfix" {...this.props}>
        {single ? 
         <Upload
          className="avatar-uploader"
          name="file"
          showUploadList={false}
          action="api/uploadt"
          onChange={this.handleChange}
         >
          {
            fileList[0] ?
              <div style={{width: size, height: size}}>
                <img style={{width: '100%', borderRadius: 5}} src={fileList[0].url} alt="" className="avatar" />
              </div> :
              <Icon type="plus" className="avatar-uploader-trigger" />
          }
         </Upload>:
         <Upload
          name="file"
          action="api/uploadt"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
         >
          {fileList.length >= 3 ? null : uploadButton}
         </Upload>
        }
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

function noop() {}

PicturesWall.propTypes = {
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  api: PropTypes.string,
  initurl: PropTypes.string
}

PicturesWall.defaultProps = {
  onSuccess: noop,
  onFail: noop,
  api: '',
  initurl: ''
}

export default PicturesWall