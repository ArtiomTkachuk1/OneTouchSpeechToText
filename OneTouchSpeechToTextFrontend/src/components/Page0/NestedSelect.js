import React from 'react';
import PropTypes from 'prop-types';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import './NestedSelect.css';
import animate from 'css-animation';

const animation = {
	enter(node, done) {
		let height;
		return animate(node, 'rc-menu-collapse', {
			start() {
				height = node.offsetHeight;
				node.style.height = 0;
			},
			active() {
				node.style.height = `${height}px`;
			},
			end() {
				node.style.height = '';
				done();
			},
		});
	},
	appear() {
		return this.enter.apply(this, arguments);
	},
	leave(node, done) {
		return animate(node, 'rc-menu-collapse', {
			start() {
				node.style.height = `${node.offsetHeight}px`;
			},
			active() {
				node.style.height = 0;
			},
			end() {
				node.style.height = '';
				done();
			},
		});
	},
};

/*class nestSubMenu extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
		<SubMenu
			title={
				<span className="submenu-title-wrapper">{this.props.a}</span>
			}
			key="0"
			popupOffset={[10, 15]}
			style={{
				width:"100%",
				backgroundColor:"white"
			}}
		>
			<MenuItem key="1">enet-coco</MenuItem>
			<SubMenu
				key="2-2"
				title={<span className="submenu-title-wrapper">yolov3</span>}
			>
				<MenuItem key="2">coco</MenuItem>
				<MenuItem key="3">drone</MenuItem>
				<MenuItem key="4">openimages</MenuItem>
			</SubMenu>
			<SubMenu
				key="3-3"
				title={<span className="submenu-title-wrapper">yolov3-tiny</span>}
			>
				<MenuItem key="5">coco</MenuItem>
				<MenuItem key="6">drone</MenuItem>
			</SubMenu>
			<SubMenu
				key="4-4"
				title={<span className="submenu-title-wrapper">yolov3-spp</span>}
			>
				<MenuItem key="7">coco</MenuItem>
				<SubMenu
					key="4-4-4"
					title={<span className="submenu-title-wrapper">drone</span>}
				>
					<MenuItem key="8">spp1</MenuItem>
					<MenuItem key="9">spp3</MenuItem>
				</SubMenu>
			</SubMenu>
			<SubMenu
				key="5-5"
				title={<span className="submenu-title-wrapper">yolov3-spp-slim</span>}
			>
				<SubMenu
					key="5-5-5"
					title={<span className="submenu-title-wrapper">drone</span>}
				>
					<MenuItem key="10">prune_0.5</MenuItem>
					<MenuItem key="11">prune_0.5_0.5_0.7</MenuItem>
					<MenuItem key="12">prune_0.9</MenuItem>
					<MenuItem key="13">prune_0.95</MenuItem>
				</SubMenu>
			</SubMenu>
			<SubMenu
				key="6-6"
				title={<span className="submenu-title-wrapper">ttfnet</span>}
			>
				<SubMenu
					key="6-6-6"
					title={<span className="submenu-title-wrapper">coco</span>}
				>
					<MenuItem key="14">ttfnet_d53_1x</MenuItem>
					<MenuItem key="15">ttfnet_d53_2x</MenuItem>
					<MenuItem key="16">ttfnet_r18_1x</MenuItem>
					<MenuItem key="17">ttfnet_r18_2x</MenuItem>
					<MenuItem key="18">ttfnet_r34_2x</MenuItem>
				</SubMenu>
			</SubMenu>
		</SubMenu>)
	}
}*/
const nestSubMenu = (
	<SubMenu
		title={
			<span className="submenu-title-wrapper">Choose transcribe model</span>
		}
		key="0"
		popupOffset={[10, 15]}
		style={{
			width:"100%",
			backgroundColor:"white"
		}}
	>
		<MenuItem key="1">Deep Speech</MenuItem>
		<SubMenu
			key="2-2"
			title={<span className="submenu-title-wrapper">Silero</span>}
		>
			<MenuItem key="2">English</MenuItem>
			<MenuItem key="3">German</MenuItem>
			<MenuItem key="4">Spaninsh</MenuItem>
		</SubMenu>
	</SubMenu>
);

const children = [
	nestSubMenu
];

function onOpenChange(value) {
	console.log('onOpenChange', value);
}




const customizeIndicator = <span>Add More Items</span>;

class CommonMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	state={
		children: children,
		overflowedIndicator: undefined,
	}
	toggleOverflowedIndicator = () => {
		this.setState({
			overflowedIndicator:
				this.state.overflowedIndicator === undefined ?
					customizeIndicator :
					undefined,
		});
	}
	handleClick(info) {
		console.log(`clicked ${info.key}`);
		console.log(info);
		this.props.set_nn(info.key);
	}
	render() {
		const { triggerSubMenuAction } = this.props;
		const { children, overflowedIndicator } = this.state;
		return (
			<div>
				{
				this.props.updateChildrenAndOverflowedIndicator
				&&
				<div>
					<button onClick={this.toggleChildren}>toggle children</button>
					<button onClick={this.toggleOverflowedIndicator}>toggle overflowedIndicator</button>
				</div>
				}
				<Menu
					onClick={this.handleClick}
					triggerSubMenuAction={triggerSubMenuAction}
					onOpenChange={onOpenChange}
					selectedKeys={['0']}
					mode={this.props.mode}
					openAnimation={this.props.openAnimation}
					defaultOpenKeys={this.props.defaultOpenKeys}
					overflowedIndicator={overflowedIndicator}
					style={{
						width:"100%"
					}}
				>
					{children}
				</Menu>
			</div>
		);
	}
}

CommonMenu.propTypes = {
	mode: PropTypes.string,
	openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	triggerSubMenuAction: PropTypes.string,
	defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
	updateChildrenAndOverflowedIndicator: PropTypes.bool,
};
export function NestedSelect(props){
	return (
		<CommonMenu
			backgroundColor="red"
			set_nn={props.set_nn}
			mode="horizontal"
			openAnimation="slide-up"
		/>
	);
}
