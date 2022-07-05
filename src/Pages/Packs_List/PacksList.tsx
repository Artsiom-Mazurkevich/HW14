import React, {ChangeEvent, useEffect} from 'react';
import s from './packsList.module.css'
import {
    Button,
    ButtonGroup,
    IconButton,
    InputBase,
    MenuItem,
    Pagination,
    Paper,
    Select,
    SelectChangeEvent,
    Slider,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {filterCardsTC, getCardsTC} from "./packsList-reducer";
import {useDebounce} from "./hook/useDebounce";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ECECF9',
        color: '#2D2E46',
        fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FFFFFF',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#F8F7FD',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

/*function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}*/

/*const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/


export const PacksList = () => {

    useEffect(() => {
        dispatch(getCardsTC())
    },[])
    const dispatch = useAppDispatch()


    const arrayCards = useAppSelector(state => state.packsList.cardPacks)
    let [minCards, maxCards] = useAppSelector(state => ([state.packsList.minCardsCount, state.packsList.maxCardsCount]))
    let cardPacksTotalCount = useAppSelector(state => Math.ceil(state.packsList.cardPacksTotalCount / state.packsList.pageCount))
    const currentPage = useAppSelector(state => state.packsList.page)





    const [value, setValue] = React.useState<number[]>([minCards, maxCards]);
    const [debounceMin, debounceMax] = useDebounce(value, 800)
    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        setValue(newValue as number[]);
    };
    useEffect(() => {
        dispatch(filterCardsTC(debounceMin, debounceMax))
    }, [debounceMin, debounceMax])





    const [age, setAge] = React.useState('7');
    const handleChangeSelect = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };





    const onChangePageCards = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(filterCardsTC(debounceMin, debounceMax, page))
    }


    console.log(value)

    return (
        <div className={s.mainBlockPacksList}>
            <div className={s.panelSelectionCards}>
                <div className={s.titleFromSelectionCards}>Show packs cards</div>
                <div className={s.buttonGroup}>
                    <ButtonGroup disableElevation variant="contained" fullWidth size={'large'}>
                        <Button>My</Button>
                        <Button>All</Button>
                    </ButtonGroup>
                </div>
                <div className={s.titleNumberOfCards}>Number of cards</div>
                <div className={s.sliderCards}>
                    <Slider
                        getAriaLabel={() => 'Count cards'}
                        value={value}
                        min={minCards}
                        max={maxCards}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        color="secondary"
                    />
                </div>
            </div>
            <div className={s.packsList}>
                <div className={s.titlePacksList}>Packs List</div>
                <div className={s.searchFieldWithButton}>
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 500}}
                    >
                        <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Search"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Paper>
                    <button>Add new pack</button>
                </div>
                <div className={s.tableCards}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Cards</StyledTableCell>
                                    <StyledTableCell align="right">Last Updated</StyledTableCell>
                                    <StyledTableCell align="right">Created by</StyledTableCell>
                                    <StyledTableCell align="right">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arrayCards.map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.cardsCount}</StyledTableCell>
                                        <StyledTableCell align="right">{new Date(row.updated).toLocaleDateString()}</StyledTableCell>
                                        <StyledTableCell align="right">{row.user_name}</StyledTableCell>
                                        <StyledTableCell align="right">##########</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={s.pagination}>
                    <Pagination page={currentPage} count={cardPacksTotalCount} shape="rounded" color={'secondary'} onChange={onChangePageCards}/>
                    <div style={{margin: '0 30px'}}>
                        Show
                        <Select
                            sx={{width: '66px', height: '30px', padding: '0', margin: '0 10px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChangeSelect}
                        >
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                        </Select>
                        Cards per Page
                    </div>
                </div>
            </div>
        </div>
    );
};

