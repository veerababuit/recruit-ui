import React from 'react';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { MonthlyCycleRequest, WeeklyCycleRequest,
    //  fetchMonthlyCycle, fetchWeeklyCycle
     } from '../../../../redux/actions/adminSettingsAction';

const AdminContractCycle = () => {
    const dispatch = useDispatch();
    const selectedMonthlyCycle = useSelector((state) => state.adminSettings.selectedMonthlyCycle);
    const selectedWeeklyCycle = useSelector((state) => state.adminSettings.selectedWeeklyCycle);


    const {
        control,
        formState: { errors },
        watch
    } = useForm();

    let required = false;
    const data1 = watch()
    const monthlyBillCycle = Array.from({ length: 28 }, (_, index) => ({
        value: index + 1,
        label: `${index + 1}`,
    }));

     const weeklyBillCycle = [
        { value: 1, label: 'Sunday' },
        { value: 2, label: 'Monday' },
        { value: 3, label: 'Tuesday' },
        { value: 4, label: 'Wednesday' },
        { value: 5, label: 'Thursday' },
        { value: 6, label: 'Friday' },
        { value: 7, label: 'Saturday' },
    ];
    const findWeeklyCycleLabel = (selectedValue) => {
        const selectedOption = weeklyBillCycle.find(option => option.value === selectedValue);
        return selectedOption ? selectedOption.label : '';
      };
      console.log(findWeeklyCycleLabel(selectedWeeklyCycle))
    const handleMonthlyCycle = () => {
        const data = {
            name: 'MONTHLYCYCLE',
            value: data1.monthlyCycle,
            type:'STRING',
        }
        dispatch(MonthlyCycleRequest({data}))
    }

    const handleWeeklyCycle = () => {
        const data = {
            name: 'WEEKLYCYCLE',
            value: data1.weeklyCycle,
            type:'STRING', 
        }
        dispatch(WeeklyCycleRequest({data}))
    }

    // useEffect(()=>{
    //     dispatch(fetchMonthlyCycle())
    //     dispatch(fetchWeeklyCycle())
    // },[dispatch])
    return (
        <div>
            <div className="fw-bold fs-6">Contract Cycle</div>
           <div className='d-flex'>
           <div>
                <div class="col-6 md:col-12">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="monthlyCycle"
                    labelId="Monthly Cycle"
                    options={monthlyBillCycle}
                    required={required}
                    requiredMsg="Monthly Cycle is required"
                    placeholder="Select Monthly Cycle Date"
                />
            </div>
            <div>You Selected Monthly Cycle Date : {selectedMonthlyCycle}</div>
            <div className=''>
            <Button label="Submit" size="small" onClick={handleMonthlyCycle} />
            </div>
            </div>
            <div>
                <div class="col-6 md:col-12">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="weeklyCycle"
                    labelId="Weekly Cycle"
                    options={weeklyBillCycle}
                    required={required}
                    requiredMsg="Weekly Cycle is required"
                    placeholder="Select Weekly Cycle Day"
                    
                />
            </div>
            <div>You Selected Weekly Cycle : {selectedWeeklyCycle}</div>
            <div className=''>
            <Button label="Submit" size="small" onClick={handleWeeklyCycle} />
            </div>
            </div>
           </div>
        </div>
    );
};

export default AdminContractCycle;
