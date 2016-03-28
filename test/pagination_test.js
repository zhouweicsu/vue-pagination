import Vue from 'vue';
import Pagination from '../src/pagination.vue';
import assert from 'assert';
import util from './util';

/**
 * 测试 分页组件
 */
describe('分页组件', function() {

    /**
     * 组件的页码计算
     */
    describe('the pagination', function() {
        var cases = [{
            total: 1000,
            uipage: 15,
            ellipsis: 1
        },{
            total: 20,
            uipage: 4, //页面未显示页码，但还得是 4 个
            ellipsis: 0
        },{
            total: 201,
            pn: 2,
            uipage: 13,
            ellipsis: 0
        },{
            total: 260,
            uipage: 15,
            ellipsis: 0
        },{
            total: 261,
            uipage: 15,
            ellipsis: 1
        },{
            total: 1,
            uipage: 4,
            ellipsis: 0
        }];
        cases.forEach(function(item){
            (function(item){
                var template, vm, el, totalbox, pagesbox;
                var total = item.total || 1000,
                    pn = item.pn || 0,
                    ps = item.ps || 20,
                    pageSpan = item.pageSpan || 10;
                it('setup test', function() {
                    template = `<pagination :total="total" :pn="pn" :ps="ps" :page-span="pageSpan"></pagination>`;
                    vm = util.createApp(template,{
                        data: {
                            total: total,
                            pn: pn,
                            ps: ps,
                            pageSpan: pageSpan
                        },
                        components: {
                            'pagination': Pagination
                        }
                    });
                    el = vm.$el;
                    totalbox = el.querySelector('.ui-pagination .total');
                    pagesbox = el.querySelector('.ui-pagination .pages');
                    assert(true);
                });

                it('should create the dom structure', function() {
                    assert(totalbox);
                    assert(pagesbox);
                });

                it('pages should match the specified a.ui-page number', function() {
                    var pages_list = pagesbox.querySelectorAll('a.ui-page');
                    var pages_array = util.filterInvisibleNode(util.nodeListToArray(pages_list));
                    assert.equal(pages_array.length, item.uipage);
                });

                it('pages should have expected ellipsis', function() {
                    var ellipsis_list = pagesbox.querySelectorAll('em.ui-page');
                    var ellipsis_array = util.filterInvisibleNode(util.nodeListToArray(ellipsis_list))
                    assert.equal(ellipsis_array.length, item.ellipsis);
                });

                it('the current page should match the specified page number', function() {
                    var currentPage = pagesbox.querySelector('a.ui-page.current').getAttribute('data-page');
                    assert.equal(currentPage, pn);
                    var prePageClass = pagesbox.firstChild.className.indexOf('disabled');
                    assert(prePageClass == ( pn==0 ? 8 : -1 ));
                });

                it('the last page should equal (1 + (total -1)/ps)', function() {
                    var lastPage = pagesbox.lastChild.previousSibling.getAttribute('data-page');
                    lastPage = (lastPage > 1) ? lastPage : 0;
                    assert.equal(lastPage, Math.floor((total -1)/ps));
                });

                it('click and chagne the current page', function() {
                    if(total > 20){
                        pagesbox.lastChild.click();
                        setTimeout(function(){
                            var currentPage = pagesbox.querySelector('a.ui-page.current').getAttribute('data-page');
                            assert.equal(currentPage, pn+1);

                            var prePageClass = pagesbox.firstChild.className.indexOf('disabled');
                            assert(prePageClass > -1);
                            done();
                        },100);
                    }else {
                        assert(true);
                    }
                });

                after(function(){
                    util.destroyApp(vm);
                });
            })(item);
        });
    });

});

