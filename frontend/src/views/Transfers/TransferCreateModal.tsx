import React, { useState, useEffect } from "react";
import { TransferService } from "../../services/transferService"; // Adjust the path
import {
  CModal,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CModalHeader,
  CRow,
  CCol,
  CForm,
} from "@coreui/react";
import ITransferFormData from "../../types/Interfaces/ITransferFormData";

interface CreateTransferModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CreateTransferModal: React.FC<CreateTransferModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const transferService = new TransferService();
  const [transfer, setTransfer] = useState<ITransferFormData>({
    accessionNumber: "",
    applicationNumber: "",
    description: "",
    status: "",
    scheduleNumber: "",
    descriptionOfRecords: "",
    agentLastName: "",
    agentFirstName: "",
    agentEmail: "",
    producerOfficeName: "",
    producerMinistry: "Attorney General",
    producerBranch: "Legal Services Branch",
    producerOfficeAddress: "",
    producerOfficeCity: "",
    producerOfficePostalCode: "",
  });

  const [visible, setVisible] = useState(isOpen); // Initialize the state based on the prop

  useEffect(() => {
    setVisible(isOpen); // Update the state when the prop changes
  }, [isOpen]);

  const handleCreateTransfer = async () => {
    try {
      // Create a new transfer using the TransferService
      console.log("handleCreateTransfer");
      console.log(transfer);

      await transferService.createTransfer(transfer);
      // Close the modal
      setVisible(false);
      onRequestClose();
    } catch (error) {
      console.error("Error creating transfer:", error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransfer({ ...transfer, [name]: value });
    console.log(name + ":" + value);
  };

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>
        Register your Transfer Information
      </CButton>
      <CModal visible={visible} size="xl" onClose={onRequestClose}>
        <CModalHeader>
          <strong>Enter your Transfer Information</strong>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                name="accessionNumber"
                placeholder="00000-00"
                value={transfer.accessionNumber}
                onChange={handleInputChange}
                label="Accession  Number"
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="text"
                name="applicationNumber"
                placeholder="00000"
                value={transfer.applicationNumber}
                onChange={handleInputChange}
                label="Application Number"
              />
            </CCol>
            <CRow>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  id="description"
                  value={transfer.description}
                  onChange={handleInputChange}
                  label="Description"
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  type="text"
                  name="scheduleNumber"
                  value={transfer.scheduleNumber}
                  onChange={handleInputChange}
                  label="schedule Number"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  name="producerMinistry"
                  value={transfer.producerMinistry}
                  onChange={handleInputChange}
                  label="Producer Ministry"
                />
              </CCol>
              <CCol xs={6}>
                <CFormInput
                  type="text"
                  name="producerBranch"
                  value={transfer.producerBranch}
                  onChange={handleInputChange}
                  label="Producer Branch"
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleCreateTransfer}>
            Save changes
          </CButton>
          <CButton color="secondary" onClick={onRequestClose}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CreateTransferModal;
