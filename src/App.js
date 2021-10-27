import React, { useState, useEffect } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import ReactDeleteRow from 'react-delete-row';


const App = () => {

  // const { apiRef, columns } = useApiRef();
  // const handleClickButton = () => {
  //   console.log(apiRef.current.getRowModels());
  // };

  // const [editRowsModel, setEditRowsModel] = useState({});
  const [state, setState] = useState({
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        // flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: 'urunAdi',
        headerName: 'Ürün Adı',
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <TextField
            onChange={(e) =>
              // params.api.updateRows([{ ...params.row, Col2: e.target.value }])
              updateRows(e.target.value, params.row.id, params.field)
            }
          />
        ),
      },
      {
        field: 'birimFiyat',
        headerName: 'Birim Fiyat',
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <TextField
            type="number"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) =>
              // params.api.updateRows([{ ...params.row, Col2: e.target.value }])
              updateRows(e.target.value, params.row.id, params.field)
            }
          />
        )
      },
      {
        field: 'adet',
        headerName: 'Adet',
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <TextField
            type="number"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) =>
              // params.api.updateRows([{ ...params.row, Col2: e.target.value }])
              updateRows(e.target.value, params.row.id, params.field)
            }
          />
        )
      },
      {
        field: 'vergiOrani',
        headerName: 'Vergi Oranı',
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <strong>
            <TextField
              select
              value={vergiOraniState}
              style={{ marginLeft: 16 }}
              // variant='standard'
              onChange={(e) => {
                // params.api.updateRows([{ ...params.row, Col2: e.target.value }])
                updateRows(e.target.value, params.row.id, params.field);
                handleChange(e);
              }
              }
            >
              {vergiler.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              
            </TextField>
          </strong>
        )
      },
      {
        field: 'vergiTutari',
        headerName: 'Vergi Tutarı',
        type: 'number',
        // editable: false,
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: 'toplamTutar',
        headerName: 'Toplam Tutar',
        type: 'number',
        // editable: false,
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
      },
    ],
    data: [
      // { id: 1, urunAdi: 'Snow', birimFiyat: 0, adet: 0, vergiOrani: 18, vergiTutari: 0, toplamTutar: 0 },
      // { id: 2, urunAdi: 'test', birimFiyat: 0, adet: 0, vergiOrani: 18, vergiTutari: 0, toplamTutar: 0 },
      // { id: 3, urunAdi: 'test', birimFiyat: 0, adet: 0, vergiOrani: 18, vergiTutari: 0, toplamTutar: 0 }
    ]
  });

  let birTotal = 0;
  let sekizTotal = 0;
  let onSekizTotal = 0;
  let fTotal = 0;

  const [vergiOraniState, setVergiOraniState] = useState('');

  const handleChange = (event) => {
    setVergiOraniState(event.target.value);
  };

  const [yuzdeBirVergiToplam, setYuzdeBirVergiToplam] = useState(0);

  const handleYuzdeBirVergiToplam = (total) => {
    setYuzdeBirVergiToplam(total);
  };

  const [yuzdeSekizVergiToplam, setYuzdeSekizVergiToplam] = useState(0);

  const handleYuzdeSekizVergiToplam = (total) => {
    setYuzdeSekizVergiToplam(total);
  };

  const [yuzdeOnSekizVergiToplam, setYuzdeOnSekizVergiToplam] = useState(0);

  const handleYuzdeOnSekizVergiToplam = (total) => {
    setYuzdeOnSekizVergiToplam(total);
  };

  const [faturaToplami, setFaturaToplami] = useState(0);

  const handleFaturaToplami = (total) => {
    setFaturaToplami(total);
  };


  const vergiler = [
    {
      value: '0',
      label: '%0',
    }, {
      value: '1',
      label: '%1',
    }, {
      value: '8',
      label: '%8',
    }, {
      value: '18',
      label: '%18',
    }
  ];

  const addRow = () => {
    var newRow = { id: state.data.length + 1, urunAdi: '', birimFiyat: 0, adet: 0, vergiOrani: '', vergiTutari: 0, toplamTutar: 0 };

    setState(prevState => {
      const data = [...prevState.data];
      data.push(newRow);
      return { ...prevState, data };
    });

    console.log(state.data);
  };

  const updateRows = (value, id, field) => {
    setState(prevState => {
      const data = [...prevState.data];

      var item = data.find((item) => item.id === id);
      item[field] = value;

      if (!!item['adet'] && !!item['birimFiyat'] && !!item['vergiOrani']) {
        item['vergiTutari'] = item['adet'] * item['birimFiyat'] * item['vergiOrani'] / 100;
        item['toplamTutar'] = item['adet'] * item['birimFiyat'] + item['vergiTutari'];
        
        
        }
      return { ...prevState, data };
    });
    
  };

  const setTotals = () => {
    const data = state.data;
    if (data.length !== 0 ) {
      for (var i = 0 ; i<data.length ; i++){
        if (data[i]['vergiOrani']=== '1') 
          birTotal += data[i]['vergiTutari'];
        else if (data[i]['vergiOrani']==='8') 
          sekizTotal += data[i]['vergiTutari'];
        else if (data[i]['vergiOrani']==='18') 
          onSekizTotal += data[i]['vergiTutari'];
    
        fTotal+=data[i]['toplamTutar'];
      }
      handleYuzdeBirVergiToplam(birTotal);
      handleYuzdeSekizVergiToplam(sekizTotal);
      handleYuzdeOnSekizVergiToplam(onSekizTotal);
      handleFaturaToplami(fTotal);
    }
  } 



  // const updateTaxTotals = () => {
  //   const data = [state.data];//satırları al
  //   let taxMap = new Map();

  //   for (let item of data) {
  //     let vergiTutari = item['vergiTutari'];
  //     let toplam = item['toplamTutar'];

  //     if (item['vergiOrani']=='1') 
  //       handleYuzdeBirVergiToplam(yuzdeBirVergiToplam+vergiTutari);
  //     else if (item['vergiOrani']=='8') 
  //       handleYuzdeSekizVergiToplam(yuzdeSekizVergiToplam+vergiTutari);
  //     else if (item['vergiOrani']=='18') 
  //       handleYuzdeOnSekizVergiToplam(yuzdeOnSekizVergiToplam+vergiTutari);
      
  //     handleFaturaToplami(faturaToplami+toplam);
  //   }
  // }

  // const handleEditRowsModelChange = React.useCallback((model) => {
  //   var state = model && Object.keys(model).length === 0 && Object.getPrototypeOf(model) === Object.prototype;
  //   setEditRowsModel(model);
  // }, []);

  return (
    <div className="App" >
      <Container maxWidth="lg">
        <Box
          component="form"
          sx={{ bgcolor: '#eee', height: '100vh', '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="input_aliciAdi"
              label="Alıcı Adı"
              margin="normal"
            />
          </div>
          <div>
            <TextField
              required
              id="input_aliciSoyadi"
              label="Alıcı Soyadı"
              margin="normal"
            />
          </div>
          <div>
            <TextField
              required
              id="input_aliciVKN"
              label="Alıcı VKN"
              margin="normal"
              type="number"
              inputProps={{
                max: 11
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              required
              id="input_faturaTarihi"
              label="Fatura Tarihi"
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={addRow}>
              Ürün Ekle
            </Button>
            <DataGrid
              rows={state.data}
              columns={state.columns}
              // editMode="row"
              pageSize={5}
              rowsPerPageOptions={[5]}
              // editRowsModel={editRowsModel}
              // onEditRowsModelChange={handleEditRowsModelChange}
              autoHeight={true}
              hideFooter={true}
              density="compact"
            />
          </div>
          <Button variant="contained" color="primary" onClick={setTotals}>
              Toplamları Hesapla
            </Button>
          <div>
            <TextField
              required
              id="input_yuzdeBirVergiToplam"
              label="%1 Vergi Toplamı"
              margin="normal"
              type="number"
              value={yuzdeBirVergiToplam}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              required
              id="input_yuzdeSekizVergiToplam"
              label="%8 Vergi Toplamı"
              margin="normal"
              type="number"
              value={yuzdeSekizVergiToplam}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              required
              id="input_yuzdeOnSekizVergiToplam"
              label="%18 Vergi Toplamı"
              margin="normal"
              type="number"
              value={yuzdeOnSekizVergiToplam}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              required
              id="input_faturaToplami"
              label="Fatura Toplamı"
              margin="normal"
              type="number"
              value={faturaToplami}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
         

          {/* <Button variant="contained" color="primary" onClick={handleClickButton}>
              Show me grid data
            </Button> */}
          {/* <Alert severity="info" style={{ marginTop: 8 }}>
              <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
            </Alert> */}

        </Box>

      </Container>

    </div>
  );
};

// function useApiRef() {
//   const apiRef = useRef(null);
//   const _columns = useMemo(
//     () =>
//       columns.concat({
//         field: "__HIDDEN__",
//         width: 0,
//         renderCell: (params) => {
//           apiRef.current = params.api;
//           return null;
//         }
//       }),
//     [columns]
//   );

//   return { apiRef, columns: _columns };
// }

export default App;
