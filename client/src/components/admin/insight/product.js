import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Img from 'react-image';

import { SquareLoader,CircleLoader } from '../../utils';
import { fetchInsightProducts } from '../../../actions';
import { timeAgo, getTimeAndDate } from '../../../services';
import Detail from './product.detail';

class ProductInsight extends Component {
    constructor(){
			super();
			this.state = {
				expandItem: {}
			}
    }
    componentDidMount(){
      this.props.fetchInsightProducts()
    }
    render(){
        const {productList} = this.props;
      return(<div className='products-componant'>
          <div className='products-list-info'>
            {productList && productList.length} products posted in the past 90 days
            {!productList && <div>0 Products</div>}
          </div>
					<div className='card product-item list-title' onClick={this.resetExpandItem.bind(this)}>
						<div style={{'display': 'flex'}}>
							<div className='list-title-item avatar'>
								Item
							</div>
							<div className='list-title-item createAt'>
								Timestamp
							</div>
							<div className='list-title-item seller'>
								Seller
							</div>
							<div className='list-title-item viewed'>
								views
							</div>
							<div className='list-title-item visited'>
								visits
							</div>
							<div className='list-title-item ordered'>
								orders
							</div>
							<div className='list-title-item reviewed'>
								reviews
							</div>
							<div className='list-title-item finished'>
								completion
							</div>
						</div>
					</div>
          <div className='product-list'>
						{this.renderList(productList)}
          </div>
      </div>)
		}
    renderList(productList){
        if(productList){
            return productList.map(p=>{
							return(<div className={`card product-item ${(this.state.expandItem[p._id])?'expanded':''}`} key={p._id}>
								<div className='row' onClick={this.expandItem.bind(this, p._id)}>
									<div className='column product-avatar avatar'>
									<a href={p.details.link} target='_blank'>
									<Img src={p.details.imageURL} loader={<CircleLoader/>} />
									</a>
									</div>
										<div onClick={()=>this.context.router.history.push(`/pd/${p.productId}`)} className='column product-createAt createAt'>
											<div className='timeDate'>{getTimeAndDate(p.createdAt, {second: '2-digit'})}</div>
											<div className='timeAgo'>{timeAgo(p.createdAt)}</div>
										</div>
										<div className='column product-seller seller'>
											{p.details.seller}
										</div>
										<div className='product-reviews'>
											{this.renderReview(p.reviews)}
										</div>
								</div>
								{this.renderDetail(p)}
							</div>)
            })
        }else{
            return <SquareLoader style={{'margin': '50px auto'}}/>
        }
		}
		renderDetail(p){
			if(this.state.expandItem[p._id]){
				return <Detail product={p}/>
			}
		}
		resetExpandItem(){
			let expandItem = {};
			this.setState({ expandItem })
		}
		expandItem(id){
			let expandItem = {};
			if(this.state.expandItem[id]){
				return this.setState({ expandItem })
			}
			expandItem[id] = true
			this.setState({ expandItem })
		}
		renderReview(reviews){
			let count = 0;
			let review = {
				visited: [],
				ordered: [],
				reviewed: [],
				finished: []
			};
			reviews.forEach(r=>{
				if(r && r.progress && review[r.progress]) {
					count += r.payload.viewed;
					switch (r.progress) {
						case 'visited':
							review[r.progress].push(r);
							break;
						case 'ordered':
							if(r.user){review[r.progress].push(r);}
							break;
						case 'reviewed':
							if(r.user){review[r.progress].push(r);}
							break;
						case 'finished':
							if(r.user){review[r.progress].push(r);}
							break;
						default:
							review[r.progress].push(r);
					}
				}
			})
			return (<div>
					<div className='column reviews-viewed viewed'>
						{count}
					</div>
					<div className='column reviews-visited visited'>
						{review.visited.length}
					</div>
					<div className='column reviews-ordered ordered'>
						{review.ordered.length}
					</div>
					<div className='column reviews-reviewed reviewed'>
						{review.reviewed.length}
					</div>
					<div className='column reviews-finished finished'>
					{review.finished.length ==0 && 0}
					{review.finished.length != 0 && 100*(review.ordered.length/review.finished.length).toFixed(2)}%
					</div>
				</div>)
		}
}

ProductInsight.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps({adminInsight}) {
  return {
		productList: adminInsight.productList
	}
}

export default connect(mapStateToProps, {fetchInsightProducts})(reduxForm({
  form: 'productInsightForm'
})(ProductInsight));