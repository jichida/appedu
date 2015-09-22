Meteor.startup(function () {
  UploadServer.init({
    tmpDir: 'D:/work/appedu/appedu/public/uploads',
    uploadDir: 'D:/work/appedu/appedu/public/uploads',
    imageVersions: {
      large: {width: 600, height: 450, format: 'jpg'},
      medium: {width: 400, height: 300, format: 'jpg'},
      small: {width: 200, height: 100, format: 'jpg'}
    },
    getDirectory: function(file, formData) {
      return formData.contentType;
    },
    finished: function(file, folder, formFields) {
      console.log('Write to database: ' + folder + '/' + file);
    }
  })
});
