<template>
    <div>
        <page-header :title="graph.name">
            <template #content>
                {{ graph.description }}
            </template>
        </page-header>
        <page-main>
            <el-container>
                <el-header height="20px">
                    <el-space :spacer="spacer">
                        <el-pagination
                            v-model:page-size="pagination.size"
                            v-model:current-page="pagination.page"
                            layout="sizes, prev, pager, next"
                            :total="pagination.total"
                            :page-sizes="[30, 50, 100, 150, 200 ,300]"
                            @size-change="sizeChange"
                            @current-change="pageChange"
                        />
                        <el-tooltip
                            placement="bottom-start"
                            trigger="hover"
                            :show-arrow="false"
                            effect="light"
                        >
                            <template #default>
                                <el-button link>
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="search" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </template>
                            <template #content>
                                <div style="text-align: center;">
                                    <el-button text @click="aside.cur='实体查询'">
                                        实体查询
                                    </el-button>
                                    <br>
                                    <el-button text @click="aside.cur='关系查询'">
                                        关系查询
                                    </el-button>
                                    <br>
                                    <el-button text @click="aside.cur='自定义查询'">
                                        自定义查询
                                    </el-button>
                                </div>
                            </template>
                        </el-tooltip>
                        <el-tooltip
                            placement="bottom-start"
                            trigger="hover"
                            :show-arrow="false"
                            effect="light"
                        >
                            <template #default>
                                <el-button link>
                                    <template #icon>
                                        <el-icon>
                                            <svg-icon name="add" />
                                        </el-icon>
                                    </template>
                                </el-button>
                            </template>
                            <template #content>
                                <div style="text-align: center;">
                                    <el-button text @click="newEntity">
                                        新增实体
                                    </el-button>
                                </div>
                            </template>
                        </el-tooltip>
                    </el-space>
                </el-header>
                <el-divider />
                <el-container>
                    <el-main>
                        <el-card id="container" shadow="never" style="min-height: 500px;">
                            <div id="mountNode" />
                        </el-card>
                    </el-main>
                    <el-divider direction="vertical" />
                    <el-aside v-if="aside.cur === 'overview'">
                        <el-card header="概览" shadow="never">
                            <el-descriptions :column="1" border>
                                <el-descriptions-item align="center">
                                    <template #label>
                                        <span>实体数</span>
                                    </template>
                                    <span style="font-size: 30px;">
                                        {{ graph.entityNum }}
                                    </span>
                                    <span>
                                        个
                                    </span>
                                </el-descriptions-item>
                                <el-descriptions-item align="center">
                                    <template #label>
                                        <span>关系数</span>
                                    </template>
                                    <span style="font-size: 30px;">
                                        {{ graph.relationNum }}
                                    </span>
                                    <span>
                                        个
                                    </span>
                                </el-descriptions-item>
                                <!--                                <el-descriptions-item align="center">-->
                                <!--                                    <template #label>-->
                                <!--                                        <span>子图数</span>-->
                                <!--                                    </template>-->
                                <!--                                    <span style="font-size: 30px;">-->
                                <!--                                        {{ graph.subgraphNum }}-->
                                <!--                                    </span>-->
                                <!--                                    <span>-->
                                <!--                                        个-->
                                <!--                                    </span>-->
                                <!--                                </el-descriptions-item>-->
                                <el-descriptions-item align="center">
                                    <template #label>
                                        <span>图谱描述</span>
                                    </template>
                                    <span style="font-size: 30px;">
                                        {{ graph.description }}
                                    </span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-card>
                        <el-divider />
                        <el-card id="minimap" header="缩略图" shadow="never" style="min-height: 100px;" />
                    </el-aside>
                    <el-aside v-else-if="aside.cur === '实体信息'">
                        <el-card header="实体信息" shadow="never">
                            <el-form :model="entityInfo">
                                <el-descriptions border :column="1">
                                    <template #title>
                                        <el-form-item>
                                            <el-space wrap>
                                                <el-tag
                                                    v-for="label in entityInfo.labels" :key="label"
                                                    effect="dark"
                                                    class="mx-1" size="large" :color="graph.colorMap[label].selectedStroke" round
                                                    closable
                                                    @close="entitiyInfoDeleteLabel(label)"
                                                >
                                                    {{ label }}
                                                </el-tag>
                                                <el-select
                                                    v-if="inputVisible"
                                                    ref="InputRef"
                                                    v-model="inputValue"
                                                    class="ml-1 w-20"
                                                    size="default"
                                                    @change="handleInputConfirm"
                                                >
                                                    <el-option
                                                        v-for="label in labels.list" :key="label.name" :label="label.name"
                                                        :value="label.name"
                                                    />
                                                </el-select>
                                                <el-button v-else round class="button-new-tag ml-1" size="default" @click="showInput">
                                                    <template #icon>
                                                        <el-icon>
                                                            <svg-icon name="add" />
                                                        </el-icon>
                                                    </template>
                                                </el-button>
                                            </el-space>
                                        </el-form-item>
                                    </template>
                                    <el-descriptions-item
                                        v-for="attribute in entityInfo.infoList"
                                        :key="attribute.name"
                                        :label="attribute.nameZh + '（' + attribute.name + '）'"
                                        align="center"
                                    >
                                        <el-form-item>
                                            <el-input v-model="entityInfo.info[attribute.name]" autosize type="textarea" />
                                        </el-form-item>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="入度" align="center">
                                        {{ entityInfo.inOut[0] }}
                                    </el-descriptions-item>
                                    <el-descriptions-item label="出度" align="center">
                                        {{ entityInfo.inOut[1] }}
                                    </el-descriptions-item>
                                </el-descriptions>
                                <el-divider />
                                <el-space>
                                    <el-button type="primary" @click="saveEntityInfo">
                                        保存
                                    </el-button>
                                    <el-button @click="deleteEntity">
                                        删除
                                    </el-button>
                                </el-space>
                            </el-form>
                        </el-card>
                    </el-aside>
                    <el-aside v-else-if="aside.cur === '关系信息'">
                        <el-card header="关系信息" shadow="never">
                            <el-descriptions border :column="1">
                                <template #title>
                                    <el-tag
                                        effect="dark"
                                        size="large" :color="graph.colorMap[relationInfo.type].selectedStroke" round
                                    >
                                        {{ relationInfo.type }}
                                    </el-tag>
                                </template>
                                <el-descriptions-item
                                    v-for="attribute in relationInfo.infoList"
                                    :key="attribute.name"
                                    :label="attribute.nameZh + '（' + attribute.name + '）'"
                                    align="center"
                                >
                                    {{ relationInfo.info[attribute.name] }}
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-divider />
                            <el-collapse accordion>
                                <el-collapse-item title="源实体" name="source">
                                    <el-card>
                                        <el-descriptions border :column="1">
                                            <template #title>
                                                <el-space wrap>
                                                    <el-tag
                                                        v-for="label in relationInfo.sourceEntityInfo.labels" :key="label"
                                                        effect="dark"
                                                        class="mx-1" size="large" :color="graph.colorMap[label].selectedStroke" round
                                                    >
                                                        {{ label }}
                                                    </el-tag>
                                                </el-space>
                                            </template>
                                            <el-descriptions-item
                                                v-for="attribute in relationInfo.sourceEntityInfo.infoList"
                                                :key="attribute.name"
                                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                                align="center"
                                            >
                                                {{ relationInfo.sourceEntityInfo.info[attribute.name] }}
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-card>
                                </el-collapse-item>
                                <el-collapse-item title="目标实体" name="target">
                                    <el-card>
                                        <el-descriptions border :column="1">
                                            <template #title>
                                                <el-space wrap>
                                                    <el-tag
                                                        v-for="label in relationInfo.targetEntityInfo.labels" :key="label"
                                                        effect="dark"
                                                        class="mx-1" size="large" :color="graph.colorMap[label].selectedStroke" round
                                                    >
                                                        {{ label }}
                                                    </el-tag>
                                                </el-space>
                                            </template>
                                            <el-descriptions-item
                                                v-for="attribute in relationInfo.targetEntityInfo.infoList"
                                                :key="attribute.name"
                                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                                align="center"
                                            >
                                                {{ relationInfo.targetEntityInfo.info[attribute.name] }}
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-card>
                                </el-collapse-item>
                            </el-collapse>
                        </el-card>
                    </el-aside>
                    <el-aside v-else-if="aside.cur === '实体查询'">
                        <el-card header="实体查询">
                            实体标签：
                            <el-select
                                v-model="entityQueryForm.label"
                                style="width: 50%;"
                                @change="entityQueryLabelChange(entityQueryForm)"
                            >
                                <el-option
                                    v-for="label in labels.list" :key="label.name" :label="label.name"
                                    :value="label.name"
                                />
                            </el-select>
                            <el-divider />
                            <el-descriptions border :column="1">
                                <el-descriptions-item
                                    v-for="(attribute, index) in entityQueryForm.attributes"
                                    :key="attribute.name"
                                    :label="attribute.nameZh + '（' + attribute.name + '）'"
                                    align="center"
                                >
                                    <el-select v-model="entityQueryForm.operators[index]">
                                        <el-option
                                            v-for="condition in entityQueryForm.conditions[index]"
                                            :key="condition" :value="condition"
                                        />
                                    </el-select>
                                    <el-input v-model="entityQueryForm.values[index]" />
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-divider />
                            <el-space>
                                <el-button @click="entityQuery()">
                                    查询
                                </el-button>
                                <el-button @click="SubgraphSelect()">
                                    添加子图数据
                                </el-button>
                            </el-space>
                        </el-card>
                        <el-card v-if="SubgraphTableShow.show" header="添加到子图">
                            <el-table
                                :data="subGraphs.list"
                                :header-cell-style="{'text-align': 'center'}"
                                :cell-style="{'text-align': 'center'}"
                                highlight-current-row
                                @selection-change="handleSelectionChange"
                            >
                                <template #empty>
                                    <span>暂无图谱数据，请点击右上角按钮新增子图</span>
                                </template>
                                <el-table-column type="selection" width="55" />
                                <el-table-column prop="name" label="子图名称" />
                                <el-table-column prop="description" label="子图描述" />
                            </el-table>
                            <p />
                            <el-space>
                                <el-button type="primary" @click="handleSubgraphAdd">添加</el-button>
                                <el-button @click="SubgraphTableShow.show = false">取消</el-button>
                            </el-space>
                        </el-card>
                    </el-aside>
                    <el-aside v-else-if="aside.cur === '关系查询'">
                        <el-card header="关系查询">
                            关系类型：
                            <el-select
                                v-model="relationQueryForm.type"
                                style="width: 50%;"
                                @change="relationQueryTypeChange"
                            >
                                <el-option
                                    v-for="type in types.list" :key="type.name" :label="type.name"
                                    :value="type.name"
                                />
                            </el-select>
                            <el-divider />
                            <el-descriptions border column="1">
                                <el-descriptions-item
                                    v-for="(attribute, index) in relationQueryForm.attributes"
                                    :key="attribute.name"
                                    :label="attribute.nameZh + '（' + attribute.name + '）'"
                                    align="center"
                                >
                                    <el-select v-model="relationQueryForm.operators[index]">
                                        <el-option
                                            v-for="condition in relationQueryForm.conditions[index]"
                                            :key="condition" :value="condition"
                                        />
                                    </el-select>
                                    <el-input v-model="relationQueryForm.values[index]" />
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-divider />
                            <el-collapse accordion>
                                <el-collapse-item title="源实体" name="source">
                                    <el-card>
                                        源实体标签：
                                        <el-select
                                            v-model="query.relation.source.label"
                                            style="width: 50%;"
                                            @change="entityQueryLabelChange(query.relation.source)"
                                        >
                                            <el-option
                                                v-for="label in labels.list" :key="label.name"
                                                :label="label.name" :value="label.name"
                                            />
                                        </el-select>
                                        <el-divider />
                                        <el-descriptions border column="1">
                                            <el-descriptions-item
                                                v-for="(attribute, index) in query.relation.source.attributes"
                                                :key="attribute.name"
                                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                                align="center"
                                            >
                                                <el-select v-model="query.relation.source.operators[index]">
                                                    <el-option
                                                        v-for="condition in query.relation.source.conditions[index]"
                                                        :key="condition" :value="condition"
                                                    />
                                                </el-select>
                                                <el-input v-model="query.relation.source.values[index]" />
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-card>
                                </el-collapse-item>
                                <el-collapse-item title="目标实体" name="target">
                                    <el-card>
                                        源实体标签：
                                        <el-select
                                            v-model="query.relation.target.label"
                                            style="width: 50%;"
                                            @change="entityQueryLabelChange(query.relation.target)"
                                        >
                                            <el-option
                                                v-for="label in labels.list" :key="label.name"
                                                :label="label.name" :value="label.name"
                                            />
                                        </el-select>
                                        <el-divider />
                                        <el-descriptions border column="1">
                                            <el-descriptions-item
                                                v-for="(attribute, index) in query.relation.target.attributes"
                                                :key="attribute.name"
                                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                                align="center"
                                            >
                                                <el-select v-model="query.relation.target.operators[index]">
                                                    <el-option
                                                        v-for="condition in query.relation.target.conditions[index]"
                                                        :key="condition" :value="condition"
                                                    />
                                                </el-select>
                                                <el-input v-model="query.relation.target.values[index]" />
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-card>
                                </el-collapse-item>
                            </el-collapse>
                            <el-divider />
                            <el-button @click="relationQuery()">
                                查询
                            </el-button>
                            <el-button @click="SubgraphSelect()">
                                添加子图数据
                            </el-button>
                        </el-card>
                        <el-card v-if="SubgraphTableShow.showR" header="添加到子图">
                            <el-table
                                :data="subGraphs.list"
                                :header-cell-style="{'text-align': 'center'}"
                                :cell-style="{'text-align': 'center'}"
                                highlight-current-row
                                @selection-change="handleSelectionChange"
                            >
                                <template #empty>
                                    <span>暂无图谱数据，请点击右上角按钮新增子图</span>
                                </template>
                                <el-table-column type="selection" width="55" />
                                <el-table-column prop="name" label="子图名称" />
                                <el-table-column prop="description" label="子图描述" />
                            </el-table>
                            <p />
                            <el-space>
                                <el-button type="primary" @click="handleSubgraphAdd">添加</el-button>
                                <el-button @click="SubgraphTableShow.showR = false">取消</el-button>
                            </el-space>
                        </el-card>
                    </el-aside>
                    <el-aside v-else-if="aside.cur === '自定义查询'">
                        <el-card header="自定义查询">
                            <el-collapse accordion>
                                <el-collapse-item title="关系类型" name="relation">
                                    <el-card>
                                        关系类型：
                                        <el-select
                                            v-model="relationQueryForm.type" clearable
                                            placeholder="请选择"
                                            style="width: 50%;"
                                            @change="relationQueryTypeChange"
                                        >
                                            <el-option
                                                v-for="type in types.list" :key="type.name" :label="type.name"
                                                :value="type.name"
                                            />
                                        </el-select>
                                        <el-divider />
                                        <el-descriptions border column="1">
                                            <el-descriptions-item
                                                v-for="(attribute, index) in relationQueryForm.attributes"
                                                :key="attribute.name"
                                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                                align="center"
                                            >
                                                <el-select v-model="relationQueryForm.operators[index]">
                                                    <el-option
                                                        v-for="condition in relationQueryForm.conditions[index]"
                                                        :key="condition" :value="condition"
                                                    />
                                                </el-select>
                                                <el-input v-model="relationQueryForm.values[index]" />
                                            </el-descriptions-item>
                                            <el-descriptions-item
                                                key="pathLen"
                                                label="路径长度（Path length）"
                                                align="center"
                                            >
                                                <el-select v-model="pathQueryForm.operators">
                                                    <el-option
                                                        v-for="condition in pathQueryForm.conditions"
                                                        :key="condition" :value="condition"
                                                    />
                                                </el-select>
                                                <el-input v-model="pathQueryForm.values" />
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-card>
                                </el-collapse-item>
                                <el-collapse-item title="源实体" name="source">
                                    <el-card>
                                        源实体标签：
                                        <el-select
                                            v-model="query.relation.source.label" clearable
                                            placeholder="请选择"
                                            style="width: 50%;"
                                            @change="entityQueryLabelChange(query.relation.source)"
                                        >
                                            <el-option
                                                v-for="label in labels.list" :key="label.name"
                                                :label="label.name" :value="label.name"
                                            />
                                        </el-select>
                                        <el-divider />
                                        <el-descriptions border column="1">
                                            <el-descriptions-item
                                                v-for="(attribute, index) in query.relation.source.attributes"
                                                :key="attribute.name"
                                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                                align="center"
                                            >
                                                <el-select v-model="query.relation.source.operators[index]">
                                                    <el-option
                                                        v-for="condition in query.relation.source.conditions[index]"
                                                        :key="condition" :value="condition"
                                                    />
                                                </el-select>
                                                <el-input v-model="query.relation.source.values[index]" />
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-card>
                                </el-collapse-item>
                                <el-collapse-item title="目标实体" name="target">
                                    <el-card>
                                        目标实体标签：
                                        <el-select
                                            v-model="query.relation.target.label" clearable
                                            placeholder="请选择"
                                            style="width: 50%;"
                                            @change="entityQueryLabelChange(query.relation.target)"
                                        >
                                            <el-option
                                                v-for="label in labels.list" :key="label.name"
                                                :label="label.name" :value="label.name"
                                            />
                                        </el-select>
                                        <el-divider />
                                        <el-descriptions border column="1">
                                            <el-descriptions-item
                                                v-for="(attribute, index) in query.relation.target.attributes"
                                                :key="attribute.name"
                                                :label="attribute.nameZh + '（' + attribute.name + '）'"
                                                align="center"
                                            >
                                                <el-select v-model="query.relation.target.operators[index]">
                                                    <el-option
                                                        v-for="condition in query.relation.target.conditions[index]"
                                                        :key="condition" :value="condition"
                                                    />
                                                </el-select>
                                                <el-input v-model="query.relation.target.values[index]" />
                                            </el-descriptions-item>
                                        </el-descriptions>
                                    </el-card>
                                </el-collapse-item>
                            </el-collapse>
                            <el-divider />
                            <el-button @click="selfOptionQuery()">
                                查询
                            </el-button>
                            <el-button @click="SubgraphSelect()">
                                添加子图数据
                            </el-button>
                        </el-card>
                        <el-card v-if="SubgraphTableShow.showO" header="添加到子图">
                            <el-table
                                :data="subGraphs.list"
                                :header-cell-style="{'text-align': 'center'}"
                                :cell-style="{'text-align': 'center'}"
                                highlight-current-row
                                @selection-change="handleSelectionChange"
                            >
                                <template #empty>
                                    <span>暂无图谱数据，请点击右上角按钮新增子图</span>
                                </template>
                                <el-table-column type="selection" width="55" />
                                <el-table-column prop="name" label="子图名称" />
                                <el-table-column prop="description" label="子图描述" />
                            </el-table>
                            <p />
                            <el-space>
                                <el-button type="primary" @click="handleSubgraphAdd">添加</el-button>
                                <el-button @click="SubgraphTableShow.showO = false">取消</el-button>
                            </el-space>
                        </el-card>
                    </el-aside>
                </el-container>
            </el-container>
        </page-main>
        <el-dialog
            v-model="expandDialog.visible"
        >
            <el-form>
                <el-form-item label="展开度数">
                    <el-input v-model="expandDialog.degree" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="expandEntityDegree">确认</el-button>
                    <el-button @click="expandDialog.visible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import {
    getEntities,
    getEntitiesQuery, getEntityInAndOut, getEntityNeighbors,
    getGraphById,
    getLabelAttributeMap,
    getRelations, getRelationsOfEntities, getRelationsQueryEntities, getSubgraphs,
    getTypeAttributeMap,
    getSelfOptionQueryEntities, updateEntity, removeEntity, createEntity, getEntityDegreeNeighbors
} from '@/api/graph'
import G6, { Algorithm } from '@antv/g6'
import { getLabels, getOntologyColorMap, getTypes } from '@/api/project'
import axios from 'axios'
import {  ElMessage } from 'element-plus'
import { fittingString, uniqueFunc } from '@/views/graphs/graph_method'
import { createSubgraphContent } from '@/api/subgraph'

export default defineComponent({
    name: 'Tableview',
    setup() {
        const graphId = 33
        const graph = reactive({
            colorMap: {},
            labelAttributeMap: Map,
            typeAttributeMap: Map
        })

        const aside = reactive({
            cur: 'overview'
        })
        const pagination = reactive({
            size: 30,
            page: 1
        })
        const g6Data = reactive({
            nodes: [],
            edges: []
        })
        const entityInfo = reactive({
            labels: [],
            infoList: [],
            info: {},
            inOut: []
        })

        const relationInfo = reactive({
            type: '',
            infoList: [],
            info: {},
            sourceEntityInfo: {},
            targetEntityInfo: {}
        })

        const sizeChange = () => {
            pageChange()
        }

        const pageChange = () => {
            if (query.entity.length === 0 && query.relation.r.length === 0 && query.path.len.length === 0) {
                axios.all([
                    getEntities(graphId, pagination.size, pagination.page).then(res => {
                        pagination.total = res.data.total
                        g6Data.nodes = res.data.data
                    }),
                    getRelations(graphId, pagination.size, pagination.page).then(res => {
                        g6Data.edges = res.data.data
                    })
                ]).then(() => {
                    setG6Data(g6Data)
                    g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                })
            } else if (query.entity.length !== 0 && query.relation.r.length === 0 && query.path.len.length === 0) {
                getEntitiesQuery(graphId, entityQueryForm.label, pagination.size, pagination.page, query.entity).then(res => {
                    pagination.total = res.data.total
                    g6Data.nodes = res.data.data
                    getRelationsOfEntities(graphId, g6Data.nodes).then(res => {
                        g6Data.edges = res.data
                        setG6Data(g6Data)
                        g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                    })
                })
            } else if (query.entity.length === 0 && query.relation.r.length !== 0 && query.path.len.length === 0 && relationQueryForm.type.length !== 0) {
                getRelationsQueryEntities(graphId, relationQueryForm.type, pagination.size, pagination.page, query.relation.r, query.relation.source.label, query.relation.target.label).then(res => {
                    pagination.total = res.data.total
                    g6Data.nodes = res.data.data
                    getRelationsOfEntities(graphId, g6Data.nodes).then(res => {
                        g6Data.edges = res.data
                        setG6Data(g6Data)
                        g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                    })
                })
            } else if (query.entity.length === 0 && query.path.len.length !== 0) {
                getSelfOptionQueryEntities(graphId, relationQueryForm.type, pagination.size, pagination.page, query.relation.r, query.relation.source.label, query.relation.target.label, query.path.len).then(res => {
                    pagination.total = res.data.total
                    g6Data.nodes = res.data.data
                    getRelationsOfEntities(graphId, g6Data.nodes).then(res => {
                        g6Data.edges = res.data
                        setG6Data(g6Data)
                        g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                    })
                })
            }
        }

        // 图配置
        const g6Config = {
            container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
            animate: true, // Boolean，可选，全局变化时否使用动画过渡
            fitCenter: true,
            modes: {
                default: [
                    'click-select',
                    {
                        type: 'drag-canvas',
                        enableOptimize: true
                    },
                    {
                        type: 'zoom-canvas',
                        enableOptimize: true
                    },
                    'drag-node',
                    {
                        type: 'activate-relations'
                    }
                ] // 允许拖拽画布、放缩画布、拖拽节点、
            },
            layout: {
                type: 'force2',
                animate: true,
                preset: {
                    type: 'grid'
                },
                nodeStrength: 2000, // 节点作用力
                edgeStrength: 500, // 边的作用力
                preventOverlap: true, // 是否防止重叠
                nodeSize: 50, // 节点大小
                nodeSpacing: 50, // 节点间距
                minMovement: 5,
                distanceThresholdMode: 'max',
                maxIteration: 200,
                interval: 0.02,
                gravity: 10
            },
            // 节点在默认状态下的样式配置（style）和其他配置
            defaultNode: {
                size: 50, // 节点大小
                // ...                 // 节点的其他配置
                // 节点样式配置
                style: {
                    stroke: 'black', // 节点描边色
                    lineWidth: 0.5 // 节点描边粗细
                },
                // 节点上的标签文本配置
                labelCfg: {
                    // 节点上的标签文本样式配置
                    style: {
                        fill: 'black' // 节点标签文字颜色
                    }
                }
            },
            // 边在默认状态下的样式配置（style）和其他配置
            defaultEdge: {
                // 边样式配置
                style: {
                    opacity: 0.6, // 边透明度
                    endArrow: {
                        path: G6.Arrow.vee(2, 5, 10), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）
                        d: 10 // 偏移量
                    }
                },
                // 边上的标签文本配置
                labelCfg: {
                    autoRotate: true // 边上的标签文本根据边的方向旋转
                }
            },
            // 节点不同状态下的样式集合
            nodeStateStyles: {
                // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
                hover: {
                    lineWidth: 2
                },
                // 鼠标点击节点，即 click 状态为 true 时的样式
                click: {
                    lineWidth: 3
                }
            },
            // 边不同状态下的样式集合
            edgeStateStyles: {
                // 鼠标点击边，即 click 状态为 true 时的样式
                click: {
                    stroke: 'black',
                    lineWidth: 3
                }
            }
        }

        const setG6Data = g6Data => {
            g6Data.nodes.forEach(node => {
                node.style = {
                    fill: graph.colorMap[node.labels[0]].mainFill,
                    stroke: graph.colorMap[node.labels[0]].mainStroke
                }
                node.stateStyles = {
                    active: {
                        fill: graph.colorMap[node.labels[0]].activeFill,
                        stroke: graph.colorMap[node.labels[0]].activeStroke,
                        shadowColor: graph.colorMap[node.labels[0]].activeStroke
                    },
                    inactive: {
                        fill: graph.colorMap[node.labels[0]].inactiveFill,
                        stroke: graph.colorMap[node.labels[0]].inactiveStroke
                    },
                    selected: {
                        fill: graph.colorMap[node.labels[0]].selectedFill,
                        stroke: graph.colorMap[node.labels[0]].selectedStroke,
                        shadowColor: graph.colorMap[node.labels[0]].selectedStroke
                    },
                    highlight: {
                        fill: graph.colorMap[node.labels[0]].highlightFill,
                        stroke: graph.colorMap[node.labels[0]].highlightStroke
                    },
                    disable: {
                        fill: graph.colorMap[node.labels[0]].disableFill,
                        stroke: graph.colorMap[node.labels[0]].disableStroke
                    }
                }
                node.label = fittingString(node.label, 50, 12)
            })
            g6Data.edges.forEach(edge => {
                edge.style = {
                    stroke: graph.colorMap[edge.label].selectedStroke
                }
                edge.label = fittingString(edge.label, 100, 12)
            })
            G6.Util.processParallelEdges(g6Data.edges)
        }
        // G6实例
        let g6Graph = ref()

        // 当前项目的实体标签
        const labels = reactive({
            list: []
        })
        // 当前项目的关系类型
        const types = reactive({
            list: []
        })

        const entityQueryForm = reactive({
            label: '',
            attributes: [],
            conditions: [],
            operators: [],
            values: []
        })

        const relationQueryForm = reactive({
            type: '',
            attributes: [],
            conditions: [],
            values: []
        })
        const pathQueryForm = reactive({
            conditions: ['>=', '=', '<='],
            operators: '',
            values: ''
        })
        const query = reactive({
            entity: '',
            relation: {
                r: '',
                source: {
                    label: '',
                    attributes: [],
                    conditions: [],
                    operators: [],
                    values: []
                },
                target: {
                    label: '',
                    attributes: [],
                    conditions: [],
                    operators: [],
                    values: []
                }
            },
            path: {
                len: ''
            }
        })

        const entityQueryLabelChange = entityQueryForm => {
            if (entityQueryForm.label.length > 0) {
                entityQueryForm.attributes = graph.labelAttributeMap[entityQueryForm.label]
                entityQueryForm.operators = []
                entityQueryForm.values = []
                entityQueryForm.attributes.forEach((attribute, index) => {
                    if (attribute.type === 0) {
                        entityQueryForm.conditions[index] = ['=', '=~']
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        entityQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                    } else if (attribute.type === 3) {
                        entityQueryForm.conditions[index] = ['=']
                    } else if (attribute.type === 4) {
                        entityQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                    } else if (attribute.type === 5) {
                        entityQueryForm.conditions[index] = ['contains']
                    }
                })
            } else {
                entityQueryForm.attributes = []
                entityQueryForm.operators = []
                entityQueryForm.values = []
                entityQueryForm.conditions = []
            }

        }

        const relationQueryTypeChange = () => {
            if (relationQueryForm.type.length > 0) {
                relationQueryForm.attributes = graph.typeAttributeMap[relationQueryForm.type]
                relationQueryForm.operators = []
                relationQueryForm.values = []
                relationQueryForm.attributes.forEach((attribute, index) => {
                    if (attribute.type === 0) {
                        relationQueryForm.conditions[index] = ['=', '=~']
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        relationQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                    } else if (attribute.type === 3) {
                        relationQueryForm.conditions[index] = ['=']
                    } else if (attribute.type === 4) {
                        relationQueryForm.conditions[index] = ['>', '>=', '=', '<=', '<']
                    } else if (attribute.type === 5) {
                        relationQueryForm.conditions[index] = ['contains']
                    }
                })
            } else {
                relationQueryForm.attributes = []
                relationQueryForm.operators = []
                relationQueryForm.values = []
                relationQueryForm.conditions = []
            }
        }

        const entityQuery = () => {
            query.path.len = ''
            query.entity = ''
            query.relation.r = ''
            let queryList = []
            entityQueryForm.attributes.forEach((attribute, index) => {
                if (entityQueryForm.operators[index] !== undefined && entityQueryForm.values[index] !== undefined && entityQueryForm.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (entityQueryForm.operators[index] === '=~') {
                            queryList.push('e.' + attribute.name + ' ' + entityQueryForm.operators[index] + ' \'.*' + entityQueryForm.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('e.' + attribute.name + ' ' + entityQueryForm.operators[index] + ' \'' + entityQueryForm.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        queryList.push('e.' + attribute.name + ' ' + entityQueryForm.operators[index] + ' ' + entityQueryForm.values[index])
                    }
                }
            })
            query.entity = queryList[0]
            for (let i = 1; i < queryList.length; i++) {
                query.entity += ' and ' + queryList[i]
            }
            pagination.page = 1
            pageChange()
        }

        const relationQuery = () => {
            console.log(query)
            query.path.len = ''
            query.entity = ''
            query.relation.r = ''
            let queryList = []
            relationQueryForm.attributes.forEach((attribute, index) => {
                if (relationQueryForm.operators[index] !== undefined && relationQueryForm.values[index] !== undefined && relationQueryForm.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (relationQueryForm.operators[index] === '=~') {
                            queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' \'.*' + relationQueryForm.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' \'' + relationQueryForm.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' ' + relationQueryForm.values[index])
                    }
                }
            })

            query.relation.source.attributes.forEach((attribute, index) => {
                if (query.relation.source.operators[index] !== undefined && query.relation.source.values[index] !== undefined && query.relation.source.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (query.relation.source.operators[index] === '=~') {
                            queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' \'.*' + query.relation.source.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' \'' + query.relation.source.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' ' + query.relation.source.values[index])
                    }
                }
            })

            query.relation.target.attributes.forEach((attribute, index) => {
                if (query.relation.target.operators[index] !== undefined && query.relation.target.values[index] !== undefined && query.relation.target.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (query.relation.target.operators[index] === '=~') {
                            queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' \'.*' + query.relation.target.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' \'' + query.relation.target.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' ' + query.relation.target.values[index])
                    }
                }
            })

            if (queryList[0] !== undefined) {
                query.relation.r = queryList[0]
            }
            for (let i = 1; i < queryList.length; i++) {
                query.relation.r += ' and ' + queryList[i]
            }
            // console.log(query.relation.r)
            pagination.page = 1
            pageChange()
        }

        const selfOptionQuery = () => {
            // console.log(query)
            query.entity = ''
            query.relation.r = ''
            query.path.len = ''
            let queryList = []
            relationQueryForm.attributes.forEach((attribute, index) => {
                if (relationQueryForm.operators[index] !== undefined && relationQueryForm.values[index] !== undefined && relationQueryForm.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (relationQueryForm.operators[index] === '=~') {
                            queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' \'.*' + relationQueryForm.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' \'' + relationQueryForm.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        queryList.push('r.' + attribute.name + ' ' + relationQueryForm.operators[index] + ' ' + relationQueryForm.values[index])
                    }
                }
            })

            query.relation.source.attributes.forEach((attribute, index) => {
                if (query.relation.source.operators[index] !== undefined && query.relation.source.values[index] !== undefined && query.relation.source.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (query.relation.source.operators[index] === '=~') {
                            queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' \'.*' + query.relation.source.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' \'' + query.relation.source.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        queryList.push('s.' + attribute.name + ' ' + query.relation.source.operators[index] + ' ' + query.relation.source.values[index])
                    }
                }
            })

            query.relation.target.attributes.forEach((attribute, index) => {
                if (query.relation.target.operators[index] !== undefined && query.relation.target.values[index] !== undefined && query.relation.target.values[index] !== '') {
                    if (attribute.type === 0) {
                        if (query.relation.target.operators[index] === '=~') {
                            queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' \'.*' + query.relation.target.values[index] + '.*\'')

                        } else if (entityQueryForm.operators[index] === '=') {
                            queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' \'' + query.relation.target.values[index] + '\'')
                        }
                    } else if (attribute.type === 1 || attribute.type === 2) {
                        queryList.push('t.' + attribute.name + ' ' + query.relation.target.operators[index] + ' ' + query.relation.target.values[index])
                    }
                }
            })
            if (queryList[0] !== undefined) {
                query.relation.r = queryList[0]
            }
            for (let i = 1; i < queryList.length; i++) {
                query.relation.r += ' and ' + queryList[i]
            }
            if (pathQueryForm.operators === '=' && pathQueryForm.values.length !== 0) {
                query.path.len = '*' + pathQueryForm.values
            } else if (pathQueryForm.operators === '<=' && pathQueryForm.values.length !== 0) {
                query.path.len = '*..' + pathQueryForm.values
            } else if (pathQueryForm.operators === '>=' && pathQueryForm.values.length !== 0) {
                query.path.len = '*' + pathQueryForm.values + '..'
            }
            // console.log(query.path.len)
            // console.log(query.relation.r)
            pagination.page = 1
            pageChange()
        }

        // 子图相关********************-start-***************************

        const subgraphContentForm = reactive({
            type: null,
            index: null,
            content: ''
        })

        const subGraphs = reactive({
            list: []
        })
        const SubgraphTableShow = reactive({
            show: false,
            showR: false,
            showO: false
        })

        const multipleSelection = reactive({
            list: []
        })
        const SubgraphSelect = () => {
            if (aside.cur === '实体查询') {
                SubgraphTableShow.show = true
            } else if (aside.cur === '关系查询') {
                SubgraphTableShow.showR = true
            } else if (aside.cur === '自定义查询') {
                SubgraphTableShow.showO = true
            }
        }

        const handleSelectionChange = val => {
            multipleSelection.list = val
            console.log(val)
        }

        const handleSubgraphAdd = () => {
            for (var subgraph of multipleSelection.list) {
                console.log(subgraph.id)
                if (query.path.len.length !== 0) {
                    subgraphContentForm.type = 1
                    subgraphContentForm.index = graphId
                    if (query.relation.source.label.length !== 0 && !query.relation.source.label.includes(':')) {
                        query.relation.source.label = ':' + query.relation.source.label
                    }
                    if (query.relation.target.label.length !== 0 && !query.relation.target.label.includes(':')) {
                        query.relation.target.label = ':' + query.relation.target.label
                    }
                    if (relationQueryForm.type.length !== 0 && !relationQueryForm.type.includes(':')) {
                        relationQueryForm.type = ':' + relationQueryForm.type
                    }
                    if (query.relation.r.length !== 0) {
                        var Query = 'where ' + query.relation.r
                    } else {
                        Query = ''
                    }
                    subgraphContentForm.content = 'match p = (s' + query.relation.source.label + ')-[r' + relationQueryForm.type + ' ' + query.path.len + ']->(t' + query.relation.target.label + ') ' + Query + ' return p '
                    createSubgraphContent(subgraph.id, subgraphContentForm).then(res => {
                        if (res.code === 1000) {
                            ElMessage({
                                message: '子图数据添加成功',
                                type: 'success'
                            })
                        }
                    })
                } else if (query.entity.length !== 0 && query.relation.r.length === 0) {
                    subgraphContentForm.type = 0
                    subgraphContentForm.index = graphId
                    subgraphContentForm.content = 'match (e:' + entityQueryForm.label + ')-[r]-(t) where ' + query.entity + ' return e,r,t '
                    createSubgraphContent(subgraph.id, subgraphContentForm).then(res => {
                        if (res.code === 1000) {
                            ElMessage({
                                message: '子图数据添加成功',
                                type: 'success'
                            })
                        }
                    })
                } else if (query.entity.length === 0 && query.relation.r.length !== 0) {
                    subgraphContentForm.type = 1
                    subgraphContentForm.index = graphId
                    if (query.relation.source.label.length !== 0 && !query.relation.source.label.includes(':')) {
                        query.relation.source.label = ':' + query.relation.source.label
                    }
                    if (query.relation.target.label.length !== 0 && !query.relation.target.label.includes(':')) {
                        query.relation.target.label = ':' + query.relation.target.label
                    }
                    subgraphContentForm.content = 'match (s' + query.relation.source.label + ')-[r:' + relationQueryForm.type + ']->(t' + query.relation.target.label + ') where ' + query.relation.r + ' return s,r,t '
                    createSubgraphContent(subgraph.id, subgraphContentForm).then(res => {
                        if (res.code === 1000) {
                            ElMessage({
                                message: '子图数据添加成功',
                                type: 'success'
                            })
                        }
                    })
                }
            }
        }

        // 子图相关-end-******************************************

        onMounted(() => {
            g6Config.width = document.getElementById('container').offsetWidth
            g6Config.height = document.getElementById('container').offsetHeight
            // 实例化 minimap 插件
            const minimap = new G6.Minimap({
                size: [document.getElementById('minimap').offsetWidth, document.getElementById('minimap').offsetHeight],
                container: 'minimap',
                type: 'keyShape',
                hideEdge: true
            })
            // 实例化 Menu 插件
            const menu = new G6.Menu({
                offsetX: 6,
                offsetY: 10,
                itemTypes: ['node'],
                getContent(e) {
                    console.log(e)
                    const outDiv = document.createElement('el-card')
                    outDiv.style.width = '180px'
                    outDiv.innerHTML = '<el-menu>' +
                        '<el-menu-item index="DFS">深度优先搜索</el-menu-item> <br>' +
                        '<el-menu-item index="BFS">广度优先搜索</el-menu-item> <br>' +
                        '<el-menu-item index="shortestPath">最短路径</el-menu-item> <br>' +
                        '<el-menu-item index="expand">展开</el-menu-item> <br>' +
                        '</el-menu>'
                    return outDiv
                },
                handleMenuClick(target, item) {
                    console.log(target.getAttribute('index'), item)
                    const cal = target.getAttribute('index')
                    if (cal === 'DFS') {
                        // DFS
                        const { depthFirstSearch } = Algorithm
                        const queue = []
                        depthFirstSearch(g6Data, item._cfg.model.id, {
                            enter: ({ current, previous }) => {
                                console.log('进入', current, previous)// 开始遍历点的回调
                                queue.push(current)
                            },
                            leave: ({ current, previous }) => {
                                console.log('离开', current, previous)// 遍历完节点的回调
                            }
                        })
                        for (let i = 0; i < queue.length; i++) {
                            setTimeout(() => {
                                const current = queue[i]
                                const currentNode = g6Graph.value.findById(current)
                                g6Graph.value.setItemState(currentNode, 'highlight', true)
                            }, 500 * i)
                        }
                    } else if (cal === 'BFS') {
                        // BFS
                        const { breadthFirstSearch } = Algorithm
                        const queue = []
                        breadthFirstSearch(g6Data, item._cfg.model.id, {
                            enter: ({ current, previous }) => {
                                console.log('进入', current, previous)// 开始遍历点的回调
                                queue.push(current)
                            },
                            leave: ({ current, previous }) => {
                                console.log('离开', current, previous)// 遍历完节点的回调
                            }
                        })
                        for (let i = 0; i < queue.length; i++) {
                            setTimeout(() => {
                                const current = queue[i]
                                const currentNode = g6Graph.value.findById(current)
                                g6Graph.value.setItemState(currentNode, 'highlight', true)
                            }, 500 * i)
                        }
                    } else if (cal === 'shortestPath') {
                        const selectedNodes = g6Graph.value.findAllByState('node', 'selected')
                        if (selectedNodes.length !== 2) {
                            alert('请选择有且仅有两个节点！')
                            return
                        }
                        clearGraphState()
                        const { findShortestPath } = G6.Algorithm
                        // path 为其中一条最短路径，allPath 为所有的最短路径
                        const { length, path, allPath } = findShortestPath(
                            g6Data,
                            selectedNodes[0].getID(),
                            selectedNodes[1].getID()
                        )
                        console.log(length, path, allPath)
                        const pathNodeMap = {}
                        path.forEach(id => {
                            const pathNode = g6Graph.value.findById(id)
                            pathNode.toFront()
                            g6Graph.value.setItemState(pathNode, 'highlight', true)
                            pathNodeMap[id] = true
                        })
                        g6Graph.value.getEdges().forEach(edge => {
                            const edgeModel = edge.getModel()
                            const source = edgeModel.source
                            const target = edgeModel.target
                            const sourceInPathIdx = path.indexOf(source)
                            const targetInPathIdx = path.indexOf(target)
                            if (sourceInPathIdx === -1 || targetInPathIdx === -1) return
                            if (Math.abs(sourceInPathIdx - targetInPathIdx) === 1) {
                                g6Graph.value.setItemState(edge, 'highlight', true)
                            }
                        })
                    } else if (cal === 'expand') {
                        console.log('展开')
                        expandDialog.visible = true
                        expandDialog.entityId = item._cfg.model.id
                    }
                }
            })

            g6Config.plugins = [minimap, menu]

            g6Graph.value = new G6.Graph(g6Config)
            getSubgraphs(graphId).then(res => {
                subGraphs.list = res.data
            })
            getGraphById(graphId).then(res => {
                graph.id = res.data.id
                graph.name = res.data.name
                graph.description = res.data.description
                graph.entityNum = res.data.entityNum
                graph.relationNum = res.data.relationNum
                graph.subgraphNum = res.data.subgraphNum
                graph.projectId = res.data.projectId
                axios.all([
                    getEntities(graphId, pagination.size, pagination.page).then(res => {
                        g6Data.nodes = res.data.data
                    }),
                    getRelations(graphId, pagination.size, pagination.page).then(res => {
                        g6Data.edges = res.data.data
                    })
                ]).then(() => {
                    getOntologyColorMap(graph.projectId).then(res => {
                        const subjectColors = []
                        for (const key in res.data) {
                            subjectColors.push(res.data[key])
                        }
                        const backColor = '#fff'
                        const theme = 'dark'
                        const disableColor = '#777'
                        const colorSets = G6.Util.getColorSetsBySubjectColors(
                            subjectColors,
                            backColor,
                            theme,
                            disableColor
                        )
                        let i = 0
                        for (const key in res.data) {
                            graph.colorMap[key] = colorSets[i++]
                        }
                        setG6Data(g6Data)
                        g6Graph.value.read(g6Data)
                    })
                })
                pagination.total = graph.entityNum
                getLabelAttributeMap(graphId).then(res => {
                    graph.labelAttributeMap = res.data
                })
                getTypeAttributeMap(graphId).then(res => {
                    graph.typeAttributeMap = res.data
                })
                getLabels(graph.projectId).then(res => {
                    labels.list = [...res.data]
                })
                getTypes(graph.projectId).then(res => {
                    types.list = [...res.data]
                })
            })
            const clearGraphState = () => {
                const nodes = g6Graph.value.getNodes()
                const edges = g6Graph.value.getEdges()
                nodes.forEach(node => {
                    g6Graph.value.clearItemStates(node, ['highlight'])
                })
                edges.forEach(edge => {
                    g6Graph.value.clearItemStates(edge, ['highlight'])
                })
            }

            // 鼠标进入节点
            g6Graph.value.on('node:mouseenter', e => {
                const nodeItem = e.item // 获取鼠标进入的节点元素对象
                g6Graph.value.setItemState(nodeItem, 'active', true) // 设置当前节点的 hover 状态为 true
            })

            // 鼠标离开节点
            g6Graph.value.on('node:mouseleave', e => {
                const nodeItem = e.item // 获取鼠标离开的节点元素对象
                g6Graph.value.setItemState(nodeItem, 'active', false) // 设置当前节点的 hover 状态为 false
            })

            // 点击节点
            g6Graph.value.on('node:click', e => {
                clearGraphState()
                aside.cur = '实体信息'
                newEntityFlag.value = false
                const nodeItem = e.item // 获取被点击的节点元素对象
                g6Graph.value.setItemState(nodeItem, 'selected', true) // 设置当前节点的 click 状态为 true
                // 展示实体信息
                entityInfo.info = nodeItem._cfg.model
                entityInfo.labels = entityInfo.info.labels
                entityInfo.infoList = []
                entityInfo.labels.forEach(label => {
                    entityInfo.infoList.push(...graph.labelAttributeMap[label])
                })
                entityInfo.infoList = uniqueFunc(entityInfo.infoList, 'id')
                // 获取节点的出度和入度
                getEntityInAndOut(graph.id, entityInfo.info.id).then(res => {
                    entityInfo.inOut = [...res.data]
                })
            })

            // 点击边
            g6Graph.value.on('edge:click', e => {
                clearGraphState()
                aside.cur = '关系信息'
                const edgeItem = e.item // 获取被点击的边元素对象
                g6Graph.value.setItemState(edgeItem, 'selected', true) // 设置当前边的 click 状态为 true
                console.log(edgeItem)
                // 展示关系信息
                relationInfo.info = edgeItem._cfg.model
                relationInfo.type = relationInfo.info.label
                relationInfo.infoList = []
                relationInfo.infoList = [...graph.typeAttributeMap[relationInfo.type]]
                // 填充关系两端的实体信息
                // 源实体信息
                relationInfo.sourceEntityInfo.info = edgeItem._cfg.sourceNode._cfg.model
                relationInfo.sourceEntityInfo.labels = relationInfo.sourceEntityInfo.info.labels
                relationInfo.sourceEntityInfo.infoList = []
                relationInfo.sourceEntityInfo.labels.forEach(label => {
                    relationInfo.sourceEntityInfo.infoList.push(...graph.labelAttributeMap[label])
                })
                relationInfo.sourceEntityInfo.infoList = uniqueFunc(relationInfo.sourceEntityInfo.infoList, 'id')
                // 目标实体信息
                relationInfo.targetEntityInfo.info = edgeItem._cfg.targetNode._cfg.model
                relationInfo.targetEntityInfo.labels = relationInfo.targetEntityInfo.info.labels
                relationInfo.targetEntityInfo.infoList = []
                relationInfo.targetEntityInfo.labels.forEach(label => {
                    relationInfo.targetEntityInfo.infoList.push(...graph.labelAttributeMap[label])
                })
                relationInfo.targetEntityInfo.infoList = uniqueFunc(relationInfo.targetEntityInfo.infoList, 'id')
            })

            // 双击节点
            g6Graph.value.on('node:dblclick', e => {
                const nodeItem = e.item // 获取被点击的节点元素对象
                // 实体信息
                entityInfo.info = nodeItem._cfg.model
                expandEntity(entityInfo.info.id)
            })
            const expandEntity = entityId => {
                getEntityNeighbors(graphId, entityId).then(res => {
                    g6Data.nodes = uniqueFunc(g6Data.nodes.concat(res.data), 'id')
                    getRelationsOfEntities(graphId, g6Data.nodes).then(res => {
                        g6Data.edges = res.data
                        setG6Data(g6Data)
                        g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                    })
                })
            }
            // 拖拽动效
            g6Graph.value.on('node:dragstart', e => {
                g6Graph.value.layout()
                refreshDragedNodePosition(e)
            })
            g6Graph.value.on('node:drag', e => {
                const forceLayout = g6Graph.value.get('layoutController').layoutMethods[0]
                forceLayout.execute()
                refreshDragedNodePosition(e)
            })
            g6Graph.value.on('node:dragend', e => {
                e.item.get('model').fx = null
                e.item.get('model').fy = null
            })
            // 选中集合改变
            g6Graph.value.on('nodeselectchange', () => {
                // // 当前操作的 item
                // console.log(e.target)
                // // 当前操作后，所有被选中的 items 集合
                // console.log(e.selectedItems)
                // // 当前操作时选中(true)还是取消选中(false)
                // console.log(e.select)
            })
        })
        const refreshDragedNodePosition = e => {
            const model = e.item.get('model')
            model.fx = e.x
            model.fy = e.y
        }
        // 实体信息编辑
        // 删除实体的标签
        const entitiyInfoDeleteLabel = label => {
            entityInfo.labels = entityInfo.labels.filter(item => item !== label)
            if (entityInfo.labels.length === 0) {
                entityInfo.labels.push('Entity')
            }
            entityInfo.infoList = []
            entityInfo.labels.forEach(label => {
                entityInfo.infoList.push(...graph.labelAttributeMap[label])
            })
        }
        // 新增实体的标签
        const inputValue = ref('')
        const inputVisible = ref(false)
        const showInput = () => {
            inputVisible.value = true
        }

        const handleInputConfirm = () => {
            if (inputValue.value) {
                if (entityInfo.labels.indexOf(inputValue.value) === -1) {
                    entityInfo.labels.push(inputValue.value)
                    entityInfo.infoList = []
                    entityInfo.labels.forEach(label => {
                        entityInfo.infoList.push(...graph.labelAttributeMap[label])
                    })
                    entityInfo.infoList = uniqueFunc(entityInfo.infoList, 'id')
                }
            }
            inputVisible.value = false
            inputValue.value = ''
        }
        // 提交修改
        const saveEntityInfo = () => {
            if (newEntityFlag.value) {
                createEntity(graph.id, entityInfo).then(() => {
                    pageChange()
                })
            } else {
                updateEntity(graph.id, entityInfo.info.id, entityInfo).then(() => {
                    pageChange()
                })
            }
        }
        // 删除
        const deleteEntity = () => {
            removeEntity(graph.id, entityInfo.info.id).then(() => {
                aside.cur = 'overview'
                pageChange()
            })
        }
        const newEntityFlag = ref(false)
        // 新增实体
        const newEntity = () => {
            newEntityFlag.value = true
            aside.cur = '实体信息'
            entityInfo.labels = ['Entity']
            entityInfo.infoList = []
            entityInfo.labels.forEach(label => {
                entityInfo.infoList.push(...graph.labelAttributeMap[label])
            })
            entityInfo.infoList = uniqueFunc(entityInfo.infoList, 'id')
            entityInfo.info = {}
        }
        const expandDialog = reactive({
            visible: false
        })
        const expandEntityDegree = () => {
            getEntityDegreeNeighbors(graphId, expandDialog.entityId, expandDialog.degree).then(res => {
                g6Data.nodes = uniqueFunc(g6Data.nodes.concat(res.data), 'id')
                getRelationsOfEntities(graphId, g6Data.nodes).then(res => {
                    g6Data.edges = res.data
                    setG6Data(g6Data)
                    g6Graph.value.render() // 读取 Step 2 中的数据源到图上
                    expandDialog.visible = false
                })
            })
        }
        return {
            handleSubgraphAdd,
            SubgraphSelect,
            SubgraphTableShow,
            subGraphs,
            handleSelectionChange,
            graph,
            aside,
            pagination,
            entityInfo,
            relationInfo,
            sizeChange,
            pageChange,
            labels,
            types,
            entityQueryForm,
            relationQueryForm,
            selfOptionQuery,
            pathQueryForm,
            entityQueryLabelChange,
            entityQuery,
            relationQueryTypeChange,
            relationQuery,
            query,
            entitiyInfoDeleteLabel,
            inputValue,
            inputVisible,
            showInput,
            handleInputConfirm,
            saveEntityInfo,
            deleteEntity,
            newEntity,
            expandDialog,
            expandEntityDegree
        }
    }
})
</script>
