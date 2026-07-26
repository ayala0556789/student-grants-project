import { useState } from "react"
import { FamilyDatails } from "./longForm/FamilyDatails"
import swal from 'sweetalert'
import { PersonalDatails } from "./longForm/PersonalDatails"
import { LearnDatails } from "./longForm/LearnDatails"
import { MultyForm } from "./longForm/MultyForm"
import { Hatzhara } from "./longForm/hatzhara"
import { BankDatails } from "./longForm/BankDatails"
import { UploadDocuments } from "./longForm/UploadDocuments";

export const NewQuestion = () => {
   
    return <>
        <MultyForm>
            <PersonalDatails></PersonalDatails>
            <FamilyDatails ></FamilyDatails>
            <LearnDatails ></LearnDatails>
            <BankDatails></BankDatails>
            <UploadDocuments></UploadDocuments>
            <Hatzhara></Hatzhara>
        </MultyForm>
    </>

}