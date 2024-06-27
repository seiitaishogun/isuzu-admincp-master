export class LCV {
  id: number
  safety: any
  performance: any
  exterior: any
  interior: any
  specification: any
  gallery: any
  list_color: any
  constructor() {
    this.safety = {slider:[]};
    this.performance = {slider: []};
    this.exterior = {slider:[]};
    this.list_color = {section: []};
    this.interior = {slider:[]};
    this.specification = {section:[]};
    this.gallery = {gallery_video:[],gallery_image:[]};
  }
}

