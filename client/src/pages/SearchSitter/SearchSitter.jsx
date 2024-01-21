import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import './searchsitter.css'
import { DatePicker, TimePicker } from 'antd'
import SitterCard from '../../Components/SitterCard/SitterCard'


const fatchHandler = async () => {
    return await axios.get('http://localhost:8080/sitter/getAllSitter').then((res) => res.data)
}
const SearchSitter = () => {
    const param = useParams()
    const [sitters, setSitters] = React.useState([])
    const [tempSitters, setTempSitters] = React.useState([])
    const [showFilter,setShowFilter] = React.useState(false)
    const [location,setLocation] = React.useState(param.location)
    React.useEffect(() => {
        fatchHandler().then((data) => setSitters(data.sitters))
    }, []);

    const onChange = (e) => {
        setLocation(e.target.value)
    }

    const onSearch = (e) => {
        e.preventDefault()
        setTempSitters(sitters.filter((item) => item.city.toLowerCase() === location))
        setShowFilter(true)
    }


    const sitterList = sitters.map((item) => (
        <SitterCard key={item._id} item={item}/>
    ))

    const filterdSitterList = tempSitters.map((item) => (
        <SitterCard key={item._id} item={item}/>
    ))
    return (
        <>
            <Header />
            <div className="search-sitter">
                <div className="filters flex-container">
                    <form className='search-bar' onSubmit={onSearch}>
                        <select name="location" id="location" value={location? location : undefined} onChange={onChange}>
                            <option value="" disabled selected hidden>Select Your Location</option>
                            <option value="ahmedabad">Ahmedabad</option>
                            <option value="navsari">Navsari</option>
                            <option value="surat">Surat</option>
                            <option value="valsad">Valsad</option>
                        </select>
                        <DatePicker size='large' className='datePicker' format='DD-MM-YY' />
                        <TimePicker.RangePicker size='large' className='timePicker' format='HH:mm' />
                        <button type='submit'>Search</button></form>
                </div>

                <div className="sitter-container">
                    {sitters ? showFilter ? filterdSitterList : sitterList : 'Oops no sitter found !!'}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchSitter