import { useFormik } from "formik";
import { Button, Modal } from "../../../../ui"

const InspectionUpdate = ({inspectionModal, setInspectionModal}) => {
     const initialValues = {
      note: '',
      sold_by_me: false,
    };

    const handleSubmit = () => {
        // console.log(formik.values);
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        enableReinitialize: true,
    });

  return (
         <Modal
                isOpen={inspectionModal}
                setIsOpen={setInspectionModal}
                padding={false}
                className={'max-w-[600px] px-4'}
                headerText={'Inspection Update'}
                headerStyle={'!text-center !capitalize !text-lg'}
            >
                <div className="px-4">
                    <div className="flex flex-col gap-4 border-b border-black pb-1" >
                        <div className="flex items-start justify-between ">
                            <div className="text-sm text-primary">
                                <p>Inspection Update</p>
                                <p>Ikeja, Lagos</p>
                            </div>

                            <span className="text-xs">25.02.2026</span>
                        </div>

                        <p className="text-sm text-primary">ref: 19028766476736</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-2 pt-4">
                        <div className="flex-col items-start ">
                            <label htmlFor="note" className="text-sm">Note</label>
                            <textarea 
                                name="note" 
                                id="note" 
                                cols="10" 
                                rows="5" 
                                placeholder="Provide boonfu with the inspection update of the above vehicle."
                                className="w-full text-sm border p-2 disabled:bg-[#D9D9D9] disabled:border-none" 
                                disabled={true}
                                value={formik.values.note}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                        </div>

                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                name="sold_by_me" 
                                id="sold_by_me"
                                value={formik.values.sold_by_me}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="sold_by_me">I can confirm this item is sold, by me</label>
                        </div>

                       <div className="pt-2">
                         <Button type="submit" variant="primary" size="small" className="rounded-md ">Submit</Button>
                       </div>
                    </form>
                </div>
            </Modal>
  )
}

export default InspectionUpdate