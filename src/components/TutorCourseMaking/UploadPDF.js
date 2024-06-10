import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { IoMdCloudUpload } from "react-icons/io"
import { setFormError, setNumberOfPages } from '../../state/slices/CourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';


// Set worker path for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString()

const UploadPdf = (props) => {
    const courseData = useSelector(state => state.courseData)
    const dispatch = useDispatch()

    const onFileChange = (event) => {
        const file = event.target.files[0];
        console.log("file: ", file);
        if (file && file.type === 'application/pdf') {
            props.setFile(file);
            dispatch(setFormError(''))
        } else {
            dispatch(setFormError("Please upload a valid PDF file."))
        }
    };

    function onDocumentLoadSuccess({ numPages }) {
        dispatch(setNumberOfPages(numPages))
      }


    return (<>
            <div className="flex items-center space-x-3">
                {
                    courseData.loading ? 
                    <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
                    :
                    <>
                        <div onClick={() => props.inputRef.current.click()} className="px-4 py-2  space-x-2 cursor-pointer group items-center flex hover:text-white hover:bg-orange-600 transition-colors duration-200 rounded-lg bg-white text-button border border-button ">
                            <IoMdCloudUpload size={25} className=" group-hover:text-white" />
                            <span>
                                Upload Course    
                            </span>
                        </div>
                        <button type="submit"  className="px-4 py-2 space-x-2 cursor-pointer items-center border border-button flex hover:bg-orange-600 transition-colors duration-200 rounded-lg bg-button text-white">
                            <span>
                                ✓ Create Course   
                            </span>
                        </button> 
                     </>
                }
            </div>
            <div className=" p-4">
                <input 
                    ref={props.inputRef}
                    type="file" 
                    accept="application/pdf" 
                    onChange={onFileChange} 
                    className="mb-4 p-2 border hidden border-gray-300 rounded" 
                />
                
                {props.file && (
                    <div className="pdf-div">
                    <p className="text-center ">
                    {courseData.numberOfpages} page(s)
            </p>
            <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.apply(null, Array(courseData.numberOfpages))
                .map((x, i) => i + 1)
                .map((page) => {
                    return (
                    <Page
                        pageNumber={page}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                    );
                })}
            </Document>
            
            </div>
                )}
            </div>

    </>
    );
};

export default UploadPdf;
