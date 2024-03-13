// =====dataTable headers=====
export const headers=[
    {
        title:'S/N',
        key:'sno',
        sortable:true,
        align:"center"
    },
    {
        title:'Project Title',
        key:'project',
        sortable:true,
        align:"center"
    },
    {
        title:'Property Type',
        key:'property_type_name',
        sortable:true,
        align:"center"
    },
    {
        title:'Lot No.',
        key:'lot_no',
        sortable:true,
        align:"center"
    },
    {
        title:'Area',
        key:'area',
        sortable:true,
        align:"center"
    },
    {
        title:'Facing',
        key:'facing',
        sortable:true,
        align:"center"
    },
    {
        title:'Status',
        key:'status_name',
        sortable:true,
        align:"center"
    },
    {
        title:'Actions',
        key:'action',
        sortable:false,
        align:'center'
    }
];
// ======================================

// ======product category with color======
export function getProjectStatusClass(status){
    switch(status){
        case "Open":
            return 'green';
        case "Booked":
            return "yellow"
        default:
            return 'red'

    }
}
// =======================================
