import { openUploadWidget } from "../../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../../src/config";

const CloudinaryUpload = ({setUrl, setName}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dknmumj82",
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
        }else{
            if(error){
                console.log(error);
            }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-green-500 font-semibold text-white rounded-md p-2" onClick={uploadImageWidget}>
      Select Song
    </button>
  );
};

export default CloudinaryUpload;
