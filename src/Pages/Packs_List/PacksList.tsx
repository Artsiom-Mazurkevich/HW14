import React, {ChangeEvent, useEffect} from 'react';
import s from './packsList.module.css'
import {
    Button,
    Fab,
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
import {changePage, deleteCardsPackTC, getCardsTC, sortPacksByDate} from "./packsList-reducer";
import {useDebounce} from "./hook/useDebounce";
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuBookIcon from '@mui/icons-material/MenuBook';


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



export const PacksList = () => {

    const dispatch = useAppDispatch()


    const arrayCards = useAppSelector(state => state.packsList.cardPacks)
    const cardPacksPageCount = useAppSelector(state => Math.ceil(state.packsList.cardPacksTotalCount / state.packsList.pageCount))
    const currentPage = useAppSelector(state => state.packsList.page)
    const sortPacks = useAppSelector(state => state.packsList.sortPacks)
    const user_id = useAppSelector(state => state.login.data._id)
    const max = useAppSelector(state => state.packsList.maxCardsCount)
    console.log(user_id)
    console.log(arrayCards.map(u => u.user_id))
    // console.log(store.getState())





    
    const deletePack = (idPack: string) => {
      dispatch(deleteCardsPackTC(idPack))
    }
    




    const [id, setId] = React.useState<string>('')


    const sortPacksHandler = () => {
        return sortPacks === '0updated'
            ? dispatch(sortPacksByDate('1updated'))
            : dispatch(sortPacksByDate('0updated'))
    }


    const [valueSearchField, setValueSearchField] = React.useState('')
    const debouncedValueSearchField = useDebounce<string>(valueSearchField, 600)

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearchField(e.currentTarget.value);
    }


    const [valueSlider, setValueSlider] = React.useState<number[]>([0, 110]);
    const [debounceMin, debounceMax] = useDebounce(valueSlider, 800)
    const handleChangeRangeSlider = (event: Event, newValue: number | number[]) => {
        setValueSlider(newValue as number[]);
    };


    const [pageCount, setPageCount] = React.useState('7');
    const handleChangeSelect = (event: SelectChangeEvent) => {
        setPageCount(event.target.value as string);
    };


    const onChangePageCards = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(changePage(page))
    }


    const showMyPacks = () => {
        debugger
        setId(user_id)
    }
    const showAllPacks = () => {
        setId('')
    }


    useEffect(() => {
        dispatch(getCardsTC(pageCount, currentPage, debounceMin, debounceMax, sortPacks, debouncedValueSearchField, id))
    }, [pageCount, currentPage, debounceMin, debounceMax, dispatch, sortPacks, debouncedValueSearchField, id])


    return (
        <div className={s.mainBlockPacksList}>
            <div className={s.panelSelectionCards}>
                <div className={s.titleFromSelectionCards}>Show packs cards</div>
                <div className={s.buttonGroup}>
                    <Button fullWidth onClick={showMyPacks} variant={id ? "contained" : 'outlined'}>My</Button>
                    <Button fullWidth onClick={showAllPacks} variant={id ? "outlined" : 'contained'}>All</Button>
                </div>
                <div className={s.titleNumberOfCards}>Number of cards</div>
                <div className={s.sliderCards}>
                    <Slider
                        getAriaLabel={() => 'Count cards'}
                        value={valueSlider}
                        max={max}
                        onChange={handleChangeRangeSlider}
                        valueLabelDisplay="on"
                        color="secondary"
                    />
                </div>
            </div>
            <div className={s.packsList}>
                <div className={s.titlePacksList}>Packs List</div>
                <div className={s.searchFieldWithButton}>
                    <Paper
                        component="div"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, borderRadius: '25px'}}
                    >
                        <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                        <InputBase
                            value={valueSearchField}
                            onChange={onChangeSearchInput}
                            sx={{ml: 1, flex: 1}}
                            placeholder="Search"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Paper>
                    <Fab variant="extended" color="secondary">
                        <AddCardIcon sx={{mr: 1}}/>
                        Add new Pack
                    </Fab>
                </div>
                <div className={s.tableCards}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Cards</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton size={'small'}
                                                    className={sortPacks === '0updated' ? s.triangleUp : s.triangleDown}
                                                    onClick={sortPacksHandler}>
                                            <svg
                                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                                data-testid="ArrowDropDownIcon">
                                                <path d="m7 10 5 5 5-5z"></path>
                                            </svg>
                                        </IconButton>
                                        Last Updated
                                    </StyledTableCell>
                                    <StyledTableCell align="right">Created by</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arrayCards.map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name.length > 20 ? '###' : row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.cardsCount}</StyledTableCell>
                                        <StyledTableCell
                                            align="right">{new Date(row.updated).toLocaleDateString()}</StyledTableCell>
                                        <StyledTableCell align="right">{row.user_name}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.user_id === user_id ? <div style={{display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                                <Fab title={'delete'}
                                                     style={{width: '36px', height: '35px', margin: '0 2px'}}
                                                     onClick={() => {deletePack(row._id)}}
                                                     size={'small'} color="error" aria-label="delete">
                                                    <DeleteIcon/>
                                                </Fab>
                                                <Fab title={'edit'}
                                                     style={{width: '36px', height: '35px', margin: '0 2px'}}
                                                     size={'small'} color="primary" aria-label="edit">
                                                    <EditIcon/>
                                                </Fab>
                                                <Fab title={'learn'}
                                                     style={{width: '36px', height: '35px', margin: '0 2px'}}
                                                     color="primary" aria-label="learn">
                                                    <MenuBookIcon/>
                                                </Fab>
                                            </div> : <Fab title={'learn'}
                                                          style={{width: '36px', height: '35px', margin: '0 2px'}}
                                                          color="primary" aria-label="learn">
                                                <MenuBookIcon/>
                                            </Fab>}

                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={s.pagination}>
                    <Pagination
                        page={currentPage}
                        count={cardPacksPageCount}
                        shape="rounded"
                        color={'secondary'}
                        onChange={onChangePageCards}
                    />
                    <div style={{margin: '0 30px'}}>
                        Show
                        <Select
                            sx={{width: '66px', height: '30px', padding: '0', margin: '0 10px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pageCount}
                            label="count"
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
