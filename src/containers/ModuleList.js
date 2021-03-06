import React from 'react'
import ModuleListItem from '../components/ModuleListItem'
import ModuleService from '../services/ModuleService'

export default class ModuleList
    extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                courseId: '',
                module: { title: '', id: '' },
                modules: [],
                selectedId: []
            };
            this.createModule = this.createModule.bind(this);
            this.updateModule = this.updateModule.bind(this);
            this.deleteModule = this.deleteModule.bind(this);
            this.titleChanged = this.titleChanged.bind(this);
            this.setCourseId = this.setCourseId.bind(this);
            this.findModuleById = this.findModuleById.bind(this);
            this.changeSelected = this.changeSelected.bind(this);
            this.moduleService = ModuleService.instance;
        }

        titleChanged(event) {
            this.setState({module: {title: event.target.value}});
        }

        createModule() {
            if (this.state.module.title === '') {
                //this.state.module = {title: ''};
                this.state.module.title = 'New Module';
            }
            this.moduleService.createModule(this.props.courseId, this.state.module)
                .then(() => {this.findAllModulesForCourse(this.props.courseId); });
        }

        setCourseId(courseId) {
            this.setState({courseId: courseId});
        }

        renderListOfModules() {
                  let modules = this.state.modules.map(module =>{
                    return <ModuleListItem module={module} key={module.id} courseId={this.props.courseId}
                                           update={this.updateModule} delete={this.deleteModule}
                                           selected={this.state.selectedId[module.id]} changeSelected={this.changeSelected}
                                           findModuleById={this.findModuleById}/>
                  });
                  return (modules);
        }

        render() {
            return (
                <div>
                    <input  onChange={this.titleChanged}
                        className="form-control"
                        placeholder="title"
                        value={this.state.module.title}/>
                    <button className= "btn btn-primary btn-block"
                        onClick={this.createModule}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <ul className="list-group">
                        {this.renderListOfModules()}
                    </ul>
                 </div>
            );
        }

        componentDidMount() {
           this.setCourseId(this.props.courseId);
        }
        componentWillReceiveProps(newProps){
           this.findAllModulesForCourse(newProps.courseId)
        }

        findAllModulesForCourse(courseId) {
           this.moduleService
              .findAllModulesForCourse(courseId)
              .then((modules) => {this.setModules(modules)});
        }

        setModules(modules) {
           this.setState({modules: modules})
        }

        updateModule(courseId, moduleId) {
            this.moduleService.updateModule(courseId, moduleId);
        }

        deleteModule(courseId, moduleId) {
            if (window.confirm('Delete module?'))
            this.moduleService.deleteModule(courseId, moduleId).then(() => {this.findAllModulesForCourse(courseId); });
        }

        findModuleById(moduleId) {
             this.moduleService.findModuleById(moduleId);
        }

    changeSelected(moduleId, selected) {
           
        var selections = [];
        selections[moduleId] = selected;
        this.setState({
            selectedId: selections
        })
    }

}
